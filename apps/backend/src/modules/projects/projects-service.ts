import { prisma } from '@/lib/db'
import type { CreateFileInput, CreateProjectInput, UpdateFileInput, UpdateProjectInput } from './projects-schema'

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

    return project
  }

  static async create(userId: string, input: CreateProjectInput) {
    const templateKey = input.template || 'academic-paper'
    const template = DEFAULT_TEMPLATES[templateKey] || DEFAULT_TEMPLATES['academic-paper']

    return prisma.project.create({
      data: {
        title: input.title,
        description: input.description,
        template: templateKey,
        ownerId: userId,
        status: 'ready',
        files: {
          create: template.files.map((file) => ({
            name: file.name,
            path: file.path,
            content: file.content,
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
    return prisma.project.delete({
      where: { id: projectId, ownerId: userId },
    })
  }

  static async createFile(projectId: string, userId: string, input: CreateFileInput) {
    // Valida acesso ao projeto
    await this.getById(projectId, userId)

    return prisma.projectFile.create({
      data: {
        projectId,
        name: input.name,
        path: input.path,
        content: input.content,
        isMain: input.isMain,
        type: input.type,
        sizeBytes: Buffer.byteLength(input.content, 'utf-8'),
      },
    })
  }

  static async updateFile(projectId: string, fileId: string, userId: string, input: UpdateFileInput) {
    await this.getById(projectId, userId)

    return prisma.projectFile.update({
      where: { id: fileId, projectId },
      data: {
        content: input.content,
        sizeBytes: Buffer.byteLength(input.content, 'utf-8'),
      },
    })
  }

  static async deleteFile(projectId: string, fileId: string, userId: string) {
    await this.getById(projectId, userId)

    return prisma.projectFile.delete({
      where: { id: fileId, projectId },
    })
  }
}
