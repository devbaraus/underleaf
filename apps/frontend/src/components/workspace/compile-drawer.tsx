import { useState } from 'react'
import { AlertCircle, Terminal, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '#/components/ui/tabs'

interface CompileError {
  file: string
  line: number
  message: string
  severity: 'error' | 'warning'
}

interface CompileDrawerProps {
  errors: CompileError[]
  rawLogs: string
  onJumpToLine?: (file: string, line: number) => void
}

export function CompileDrawer({ errors, rawLogs, onJumpToLine }: CompileDrawerProps) {
  const [isOpen, setIsOpen] = useState(true)

  if (!errors.length && !rawLogs) return null

  return (
    <div className="border-t border-zinc-800 bg-zinc-950 text-xs">
      <div className="flex h-8 items-center justify-between bg-zinc-900/80 px-3 border-b border-zinc-800">
        <div className="flex items-center space-x-2">
          {errors.some((e) => e.severity === 'error') ? (
            <span className="flex items-center font-semibold text-red-400">
              <AlertCircle className="mr-1 h-3.5 w-3.5" />
              Erros de Compilação ({errors.filter((e) => e.severity === 'error').length})
            </span>
          ) : (
            <span className="flex items-center font-semibold text-emerald-400">
              <Terminal className="mr-1 h-3.5 w-3.5" />
              Logs de Compilação
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-zinc-400 hover:text-zinc-200"
        >
          {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </button>
      </div>

      {isOpen && (
        <div className="h-40 overflow-y-auto p-2">
          <Tabs defaultValue="errors">
            <TabsList className="h-7 bg-zinc-900 border border-zinc-800">
              <TabsTrigger value="errors" className="text-xs data-[state=active]:bg-zinc-800">
                Erros Estruturados ({errors.length})
              </TabsTrigger>
              <TabsTrigger value="raw" className="text-xs data-[state=active]:bg-zinc-800">
                Log Bruto TeX
              </TabsTrigger>
            </TabsList>

            <TabsContent value="errors" className="mt-2 space-y-1">
              {errors.length === 0 ? (
                <div className="text-zinc-500 py-2">Nenhum erro de sintaxe detectado.</div>
              ) : (
                errors.map((err, i) => (
                  <div
                    key={i}
                    onClick={() => onJumpToLine?.(err.file, err.line)}
                    className="flex items-start space-x-2 rounded p-1.5 hover:bg-zinc-900 cursor-pointer border border-transparent hover:border-zinc-800"
                  >
                    {err.severity === 'error' ? (
                      <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="font-semibold text-zinc-300">
                        {err.file}:{err.line}
                      </div>
                      <div className="text-zinc-400 font-mono text-[11px]">{err.message}</div>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>

            <TabsContent value="raw">
              <pre className="rounded bg-zinc-900/80 p-2 font-mono text-[11px] text-zinc-400 overflow-x-auto whitespace-pre-wrap">
                {rawLogs || 'Nenhum log disponível.'}
              </pre>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
