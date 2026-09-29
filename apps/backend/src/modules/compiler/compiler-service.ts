import { copyFileSync, mkdirSync, rmSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { prisma } from '@/lib/db'
import { logging } from '@/shared/logger'
import { parseLatexErrors } from './error-parser'
import { runTectonic } from './tectonic-runner'
import type { CompileBody } from './compiler-schema'

export class CompilerService {
  static async compile(projectId: string, userId: string, payload?: CompileBody) {
    const startTime = Date.now()

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { files: true },
    })

    if (!project) {
      const error: any = new Error('Projeto não encontrado')
      error.status = 404
      throw error
    }

    // Identifica o arquivo principal (default: main.tex)
    const mainFileRecord = project.files.find((f) => f.isMain) || project.files.find((f) => f.path === 'main.tex')
    const mainFileName = mainFileRecord ? mainFileRecord.path : 'main.tex'

    // Prepara diretório efêmero de build
    const buildId = `build_${Date.now()}_${crypto.randomUUID().slice(0, 8)}`
    const buildDir = resolve(process.cwd(), `storage/builds/${projectId}/${buildId}`)
    const pdfCacheDir = resolve(process.cwd(), 'storage/pdf_cache')

    mkdirSync(buildDir, { recursive: true })
    mkdirSync(pdfCacheDir, { recursive: true })

    try {
      // 1. Materializa arquivos salvos no disco
      const fileMap = new Map<string, string>()
      for (const file of project.files) {
        fileMap.set(file.path, file.content)
      }

      // 2. Sobrepõe arquivos não salvos enviados no payload
      if (payload?.unsavedFiles) {
        for (const unsaved of payload.unsavedFiles) {
          fileMap.set(unsaved.path, unsaved.content)
          // Atualiza também no banco de dados para sincronismo
          await prisma.projectFile.updateMany({
            where: { projectId, path: unsaved.path },
            data: { content: unsaved.content, updatedAt: new Date() },
          })
        }
      }

      // 3. Escreve arquivos na pasta de build
      for (const [filePath, content] of fileMap.entries()) {
        const fullPath = resolve(buildDir, filePath)
        mkdirSync(dirname(fullPath), { recursive: true })
        writeFileSync(fullPath, content, 'utf-8')
      }

      // 4. Executa compilação Tectonic
      const runResult = await runTectonic(buildDir, mainFileName)
      const durationMs = Date.now() - startTime

      let parsedErrors: any[] = []
      let finalPdfPath: string | null = null

      if (runResult.success && runResult.pdfPath) {
        finalPdfPath = resolve(pdfCacheDir, `${projectId}.pdf`)
        copyFileSync(runResult.pdfPath, finalPdfPath)

        await prisma.project.update({
          where: { id: projectId },
          data: {
            hasPdf: true,
            lastCompiledAt: new Date(),
            status: 'success',
            compilationCount: { increment: 1 },
          },
        })
      } else {
        parsedErrors = parseLatexErrors(runResult.output, mainFileName)
        await prisma.project.update({
          where: { id: projectId },
          data: {
            status: 'error',
            compilationCount: { increment: 1 },
          },
        })
      }

      // 5. Registra log na tabela compile_log
      await prisma.compileLog.create({
        data: {
          projectId,
          userId,
          success: runResult.success,
          durationMs,
          errors: parsedErrors,
          rawOutput: runResult.output,
          engine: 'tectonic',
        },
      })

      return {
        success: runResult.success,
        durationMs,
        pdfUrl: runResult.success ? `/api/projects/${projectId}/pdf` : null,
        errors: parsedErrors,
        rawOutput: runResult.output,
      }
    } finally {
      // Limpeza do workspace efêmero
      try {
        if (existsSync(buildDir)) {
          rmSync(buildDir, { recursive: true, force: true })
        }
      } catch (cleanupError) {
        logging.warn('[compiler] Erro ao limpar buildDir:', cleanupError)
      }
    }
  }

  static async getPdf(projectId: string) {
    const pdfPath = resolve(process.cwd(), `storage/pdf_cache/${projectId}.pdf`)
    if (!existsSync(pdfPath)) {
      const error: any = new Error('PDF ainda não compilado')
      error.status = 404
      throw error
    }

    return Bun.file(pdfPath)
  }

  static async getLogs(projectId: string) {
    return prisma.compileLog.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' },
      take: 20,
    })
  }
}
