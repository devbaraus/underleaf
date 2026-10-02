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

async function captureAndStreamOutput(
  stream: ReadableStream<Uint8Array>,
  prefix: string,
  onLine?: (line: string) => void,
): Promise<string> {
  const reader = stream.getReader()
  const decoder = new TextDecoder()
  let fullOutput = ''
  let buffer = ''

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value, { stream: true })
      fullOutput += chunk
      buffer += chunk

      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''

      for (const line of lines) {
        const trimmed = line.trim()
        if (trimmed) {
          logging.info(`${prefix} ${trimmed}`)
          onLine?.(trimmed)
        }
      }
    }

    if (buffer.trim()) {
      logging.info(`${prefix} ${buffer.trim()}`)
      onLine?.(buffer.trim())
    }
  } catch (err) {
    logging.warn(`${prefix} Erro ao ler stream:`, err)
  } finally {
    reader.releaseLock()
  }

  return fullOutput
}

export async function runTectonic(
  buildDir: string,
  mainFile = 'main.tex',
  timeoutMs = env.TECTONIC_TIMEOUT_MS,
  onLog?: (line: string) => void,
): Promise<TectonicRunResult> {
  const binary = resolveTectonicBinary()
  const mainFilePath = resolve(buildDir, mainFile)

  if (!existsSync(mainFilePath)) {
    logging.error(`[tectonic] Arquivo principal não encontrado: ${mainFile} em ${buildDir}`)
    return {
      success: false,
      exitCode: -1,
      output: `Arquivo principal não encontrado: ${mainFile}`,
    }
  }

  const args = [binary, '--keep-logs', '--outdir', buildDir, mainFilePath]
  logging.info(`[tectonic] Executando comando: ${binary} ${args.slice(1).join(' ')}`)

  const startTime = Date.now()
  let timeout: ReturnType<typeof setTimeout> | undefined
  try {
    const proc = Bun.spawn(args, {
      cwd: buildDir,
      stdout: 'pipe',
      stderr: 'pipe',
      env: {
        ...process.env,
      },
    })

    const timeoutPromise = new Promise<never>(
      (_, reject) =>
        (timeout = setTimeout(() => {
          try {
            proc.kill()
          } catch {}
          reject(new Error(`Tempo limite de compilação excedido (${timeoutMs / 1000}s)`))
        }, timeoutMs)),
    )

    const executionPromise = (async () => {
      const [stdoutText, stderrText] = await Promise.all([
        captureAndStreamOutput(proc.stdout, '[tectonic]', onLog),
        captureAndStreamOutput(proc.stderr, '[tectonic]', onLog),
      ])

      const exitCode = await proc.exited
      const output = `${stdoutText}\n${stderrText}`.trim()
      const expectedPdf = resolve(buildDir, mainFile.replace(/\.tex$/i, '.pdf'))
      const success = exitCode === 0 && existsSync(expectedPdf)
      const durationMs = Date.now() - startTime

      logging.info(
        `[tectonic] Processo finalizado em ${durationMs}ms com exit code ${exitCode} (sucesso: ${success})`,
      )

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
  } finally {
    if (timeout) clearTimeout(timeout)
  }
}
