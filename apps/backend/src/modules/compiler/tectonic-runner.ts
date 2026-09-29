import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { env } from '@/lib/env'
import { logging } from '@/shared/logger'

export interface TectonicRunResult {
  success: boolean
  exitCode: number
  output: string
  pdfPath?: string
}

function resolveTectonicBinary(): string {
  const candidates = [
    resolve(process.cwd(), env.TECTONIC_BIN_PATH),
    resolve(process.cwd(), './bin/tectonic'),
    resolve(process.cwd(), '../../bin/tectonic'),
    '/usr/local/bin/tectonic',
    'tectonic',
  ]

  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return candidate
    }
  }

  return candidates[0]
}

export async function runTectonic(
  buildDir: string,
  mainFile = 'main.tex',
  timeoutMs = 60000,
): Promise<TectonicRunResult> {
  const binary = resolveTectonicBinary()
  const mainFilePath = resolve(buildDir, mainFile)

  if (!existsSync(mainFilePath)) {
    return {
      success: false,
      exitCode: -1,
      output: `Arquivo principal não encontrado: ${mainFile}`,
    }
  }

  const args = [
    binary,
    '--keep-logs',
    '--outdir',
    buildDir,
    mainFilePath,
  ]

  try {
    const proc = Bun.spawn(args, {
      cwd: buildDir,
      stdout: 'pipe',
      stderr: 'pipe',
      env: {
        ...process.env,
      },
    })

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => {
        try {
          proc.kill()
        } catch {}
        reject(new Error(`Tempo limite de compilação excedido (${timeoutMs / 1000}s)`))
      }, timeoutMs),
    )

    const executionPromise = (async () => {
      const [stdoutText, stderrText] = await Promise.all([
        new Response(proc.stdout).text(),
        new Response(proc.stderr).text(),
      ])

      const exitCode = await proc.exited
      const output = `${stdoutText}\n${stderrText}`.trim()
      const expectedPdf = resolve(buildDir, mainFile.replace(/\.tex$/i, '.pdf'))
      const success = exitCode === 0 && existsSync(expectedPdf)

      return {
        success,
        exitCode,
        output,
        pdfPath: success ? expectedPdf : undefined,
      }
    })()

    return await Promise.race([executionPromise, timeoutPromise])
  } catch (error: any) {
    logging.error('[tectonic] Falha na execução:', error)
    return {
      success: false,
      exitCode: -1,
      output: error.message || 'Erro desconhecido na execução do compilador',
    }
  }
}
