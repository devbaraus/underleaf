import { copyFileSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { prisma } from '@/lib/db'
import { logging } from '@/shared/logger'
import { copyProjectDirectory } from '@/modules/projects/project-storage'
import { assertProjectAccess } from '../projects/project-access'
import { ProjectsService } from '@/modules/projects/projects-service'
import { parseLatexErrors } from './error-parser'
import { runTectonic } from './tectonic-runner'
import type { CompileBody } from './compiler-schema'

export class CompilerService {
  static async compile(
    projectId: string,
    userId: string,
    payload?: CompileBody,
    onLog?: (line: string) => void,
  ) {
    await assertProjectAccess(projectId, userId, 'write')
    const startTime = Date.now()

    logging.info(`[compiler] Iniciando fluxo de compilação: projeto ${projectId} (usuário: ${userId})`)
    onLog?.('[compiler] Iniciando fluxo de compilação...')

    const project = await ProjectsService.getById(projectId, userId)

    // Identifica o arquivo principal (default: main.tex)
    const mainFileRecord =
      project.files.find((f) => f.isMain) || project.files.find((f) => f.path === 'main.tex')
    const mainFileName = mainFileRecord ? mainFileRecord.path : 'main.tex'

    // Prepara diretório efêmero de build
    const buildId = `build_${Date.now()}_${crypto.randomUUID().slice(0, 8)}`
    const buildDir = resolve(process.cwd(), `storage/builds/${projectId}/${buildId}`)
    const pdfCacheDir = resolve(process.cwd(), 'storage/pdf_cache')

    mkdirSync(buildDir, { recursive: true })
    mkdirSync(pdfCacheDir, { recursive: true })

    try {
      // 1. Persiste alterações pendentes diretamente na árvore física do projeto.
      if (payload?.unsavedFiles && payload.unsavedFiles.length > 0) {
        onLog?.(`[compiler] Salvando ${payload.unsavedFiles.length} arquivo(s) modificado(s)...`)
        for (const unsaved of payload.unsavedFiles) {
          const file = project.files.find((item) => item.path === unsaved.path)
          if (!file || file.type === 'image') continue

          await ProjectsService.updateFile(projectId, file.id, userId, { content: unsaved.content })
        }
      }

      // 2. Copia a árvore física para um workspace efêmero de compilação.
      onLog?.('[compiler] Preparando workspace efêmero...')
      copyProjectDirectory(projectId, buildDir)

      // 4. Executa compilação Tectonic
      logging.info(`[compiler] Executando Tectonic no diretório: ${buildDir} (arquivo principal: ${mainFileName})`)
      onLog?.(`[compiler] Executando Tectonic (${mainFileName})...`)
      const runResult = await runTectonic(buildDir, mainFileName, undefined, onLog)
      const durationMs = Date.now() - startTime

      let parsedErrors: any[] = []
      let finalPdfPath: string | null = null

      if (runResult.success && runResult.pdfPath) {
        finalPdfPath = resolve(pdfCacheDir, `${projectId}.pdf`)
        copyFileSync(runResult.pdfPath, finalPdfPath)
        logging.info(`[compiler] Compilação do projeto ${projectId} concluída com SUCESSO em ${durationMs}ms -> ${finalPdfPath}`)

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
        logging.warn(`[compiler] Compilação do projeto ${projectId} FALHOU em ${durationMs}ms com ${parsedErrors.length} erro(s) identificado(s)`)
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
