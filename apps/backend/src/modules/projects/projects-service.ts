import { basename } from 'node:path'
import { prisma } from '@/lib/db'
import type { CreateFileInput, CreateProjectInput, UpdateFileInput, UpdateProjectInput } from './projects-schema'
import {
  ensureProjectFile,
  normalizeProjectPath,
  readProjectFile,
  removeProjectDirectory,
  removeProjectFile,
  writeProjectFile,
} from './project-storage'

const DEFAULT_TEMPLATES: Record<string, { files: { name: string; path: string; content: string; isMain: boolean; type: string }[] }> = {
  'academic-paper': {
    files: [
      {
        name: 'main.tex',
        path: 'main.tex',
        isMain: true,
        type: 'tex',
        content: `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage{amsmath,amsfonts,amssymb}
\\usepackage{graphicx}
\\usepackage{hyperref}

\\title{Underleaf: Plataforma Moderna de LaTeX}
\\author{Pesquisador Underleaf}
\\date{\\today}

\\begin{document}

\\maketitle

\\begin{abstract}
Este documento demonstra o poder da plataforma Underleaf com compilação ultra-rápida via Tectonic e interface reativa com React 19.
\\end{abstract}

\\section{Introdução}
O Underleaf fornece um ambiente completo para escrita e edição científica colaborativa.

\\section{Fórmulas Matemáticas}
Uma equação fundamental da física:
\\begin{equation}
E = mc^2
\\end{equation}

E a identidade de Euler:
\\begin{equation}
e^{i\\pi} + 1 = 0
\\end{equation}

\\section{Conclusão}
O fluxo de trabalho unificado com visualizador PDF em tempo real acelera a produtividade acadêmica.

\\end{document}
`,
      },
      {
        name: 'references.bib',
        path: 'references.bib',
        isMain: false,
        type: 'bib',
        content: `@article{underleaf2026,
  title={Underleaf: High Performance Open Source LaTeX Ecosystem},
  author={Underleaf Team},
  journal={Journal of Modern Publishing},
  year={2026}
}
`,
      },
    ],
  },
  blank: {
    files: [
      {
        name: 'main.tex',
        path: 'main.tex',
        isMain: true,
        type: 'tex',
        content: `\\documentclass{article}
\\begin{document}
Documento em branco iniciado no Underleaf.
\\end{document}
`,
      },
    ],
  },
  beamer: {
    files: [
      {
        name: 'main.tex',
        path: 'main.tex',
        isMain: true,
        type: 'tex',
        content: `\\documentclass{beamer}
\\usetheme{Madrid}

\\title{Apresentação Underleaf}
\\author{Equipe Underleaf}
\\date{\\today}

\\begin{document}

\\frame{\\titlepage}

\\begin{frame}
\\frametitle{Visão Geral}
\\begin{itemize}
  \\item Alto desempenho com Bun e Tectonic
  \\item Interface reativa com TanStack Start
  \\item Gestão avançada de usuários e cotas
\\end{itemize}
\\end{frame}

\\end{document}
`,
      },
    ],
  },
}

export class ProjectsService {
  private static async assertAccess(projectId: string, userId: string) {
    const project = await prisma.project.findFirst({
      where: { id: projectId, ownerId: userId },
    })
    if (!project) {
      const error: any = new Error('Projeto não encontrado')
      error.status = 404
      throw error
    }
    return project
  }

  static async list(userId: string) {
    return prisma.project.findMany({
      where: { ownerId: userId },
      orderBy: { updatedAt: 'desc' },
      include: {
        _count: {
          select: { files: true },
        },
      },
    })
  }

  static async getById(projectId: string, userId: string) {
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        ownerId: userId,
      },
      include: {
        files: {
          orderBy: { name: 'asc' },
        },
      },
    })

    if (!project) {
      const error: any = new Error('Projeto não encontrado')
      error.status = 404
      throw error
    }

    // Migração transparente: projetos antigos são materializados no primeiro acesso.
    for (const file of project.files) {
      ensureProjectFile(projectId, file)
    }
    if (project.files.some((file) => file.content !== '')) {
      await prisma.projectFile.updateMany({
        where: { projectId },
        data: { content: '' },
      })
    }

    return {
      ...project,
      files: project.files.map((file) => ({
        ...file,
        content: readProjectFile(projectId, file.path, file.type),
      })),
    }
  }

  static async create(userId: string, input: CreateProjectInput) {
    const templateKey = input.template || 'academic-paper'
    const template = DEFAULT_TEMPLATES[templateKey] || DEFAULT_TEMPLATES['academic-paper']

    const project = await prisma.project.create({
      data: {
        title: input.title,
        description: input.description,
        template: templateKey,
        ownerId: userId,
        status: 'ready',
        storageBytes: template.files.reduce(
          (total, file) => total + Buffer.byteLength(file.content, 'utf-8'),
          0,
        ),
        files: {
          create: template.files.map((file) => ({
            name: file.name,
            path: file.path,
            content: '',
            isMain: file.isMain,
            type: file.type,
            sizeBytes: Buffer.byteLength(file.content, 'utf-8'),
          })),
        },
      },
      include: {
        files: true,
      },
    })

    try {
      for (const file of template.files) {
        writeProjectFile(project.id, file.path, file.content, file.type)
      }
      return {
        ...project,
        files: project.files.map((file) => ({
          ...file,
          content: template.files.find((item) => item.path === file.path)?.content || '',
        })),
      }
    } catch (error) {
      removeProjectDirectory(project.id)
      await prisma.project.delete({ where: { id: project.id } })
      throw error
    }
  }

  static async update(projectId: string, userId: string, input: UpdateProjectInput) {
    return prisma.project.update({
      where: { id: projectId, ownerId: userId },
      data: {
        ...(input.title ? { title: input.title } : {}),
        ...(input.description !== undefined ? { description: input.description } : {}),
      },
    })
  }

  static async delete(projectId: string, userId: string) {
    await this.assertAccess(projectId, userId)
    const project = await prisma.project.delete({
      where: { id: projectId, ownerId: userId },
    })
    removeProjectDirectory(projectId)
    return project
  }

  static async createFile(projectId: string, userId: string, input: CreateFileInput) {
    await this.assertAccess(projectId, userId)
    const path = normalizeProjectPath(input.path)
    const existingFile = await prisma.projectFile.findUnique({
      where: { projectId_path: { projectId, path } },
    })
    if (existingFile) {
      const error: any = new Error('Já existe um arquivo neste caminho')
      error.status = 409
      throw error
    }

    const sizeBytes = writeProjectFile(projectId, path, input.content, input.type)

    try {
      const file = await prisma.projectFile.create({
        data: {
          projectId,
          name: basename(path),
          path,
          content: '',
          isMain: input.isMain,
          type: input.type,
          sizeBytes,
        },
      })
      await prisma.project.update({
        where: { id: projectId },
        data: { storageBytes: { increment: sizeBytes } },
      })
      return { ...file, content: input.type === 'image' ? '' : input.content }
    } catch (error) {
      removeProjectFile(projectId, path)
      throw error
    }
  }

  static async updateFile(projectId: string, fileId: string, userId: string, input: UpdateFileInput) {
    await this.assertAccess(projectId, userId)
    const file = await prisma.projectFile.findFirst({
      where: { id: fileId, projectId },
    })
    if (!file) {
      const error: any = new Error('Arquivo não encontrado')
      error.status = 404
      throw error
    }

    const sizeBytes = writeProjectFile(projectId, file.path, input.content, file.type)
    const updatedFile = await prisma.projectFile.update({
      where: { id: fileId, projectId },
      data: {
        content: '',
        sizeBytes,
      },
    })
    await prisma.project.update({
      where: { id: projectId },
      data: { storageBytes: { increment: sizeBytes - file.sizeBytes } },
    })
    return { ...updatedFile, content: file.type === 'image' ? '' : input.content }
  }

  static async deleteFile(projectId: string, fileId: string, userId: string) {
    await this.assertAccess(projectId, userId)
    const file = await prisma.projectFile.findFirst({
      where: { id: fileId, projectId },
    })
    if (!file) {
      const error: any = new Error('Arquivo não encontrado')
      error.status = 404
      throw error
    }

    const deletedFile = await prisma.projectFile.delete({
      where: { id: fileId, projectId },
    })
    removeProjectFile(projectId, file.path)
    await prisma.project.update({
      where: { id: projectId },
      data: { storageBytes: { decrement: file.sizeBytes } },
    })
    return deletedFile
  }
}
