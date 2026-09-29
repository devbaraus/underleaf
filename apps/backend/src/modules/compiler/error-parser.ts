export interface CompileError {
  file: string
  line: number
  message: string
  severity: 'error' | 'warning'
}

/**
 * Parser de saída TeX/LaTeX para extrair arquivo, linha e mensagem estruturada de erros.
 */
export function parseLatexErrors(rawOutput: string, defaultFile = 'main.tex'): CompileError[] {
  const errors: CompileError[] = []
  const lines = rawOutput.split('\n')

  let currentFile = defaultFile

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Detecta arquivo atual via parenteses (ex: (./chapters/intro.tex)
    const fileMatch = line.match(/\(([^()]+?\.(?:tex|bib|sty|cls))/i)
    if (fileMatch && fileMatch[1]) {
      const cleanPath = fileMatch[1].replace(/^\.\//, '').trim()
      if (cleanPath.endsWith('.tex') || cleanPath.endsWith('.bib')) {
        currentFile = cleanPath
      }
    }

    // Detecta linhas de erro iniciadas por "!"
    if (line.startsWith('!')) {
      const errorMessage = line.substring(1).trim()
      let errorLineNumber = 1

      // Procura a linha "l.<numero>" nas próximas 5 linhas
      for (let j = i + 1; j < Math.min(i + 6, lines.length); j++) {
        const lineMatch = lines[j].match(/^l\.(\d+)/)
        if (lineMatch && lineMatch[1]) {
          errorLineNumber = parseInt(lineMatch[1], 10)
          break
        }
      }

      errors.push({
        file: currentFile,
        line: errorLineNumber,
        message: errorMessage,
        severity: 'error',
      })
    }

    // Detecta LaTeX Warnings importantes
    if (line.includes('LaTeX Warning:')) {
      const warnMatch = line.match(/LaTeX Warning:\s*(.+?)(?:\s+on input line\s+(\d+))?\./)
      if (warnMatch) {
        errors.push({
          file: currentFile,
          line: warnMatch[2] ? parseInt(warnMatch[2], 10) : 1,
          message: warnMatch[1].trim(),
          severity: 'warning',
        })
      }
    }
  }

  return errors
}
