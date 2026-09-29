import { useState } from 'react'
import { Download, RefreshCw, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { appConfig } from '#/config'

interface PdfPreviewerProps {
  projectId: string
  hasPdf: boolean
  lastCompiledAt?: string | null
  isCompiling: boolean
}

export function PdfPreviewer({
  projectId,
  hasPdf,
  lastCompiledAt,
  isCompiling,
}: PdfPreviewerProps) {
  const [zoom, setZoom] = useState(100)
  const [refreshKey, setRefreshKey] = useState(Date.now())

  const pdfUrl = `${appConfig.apiUrl}/api/projects/${projectId}/pdf?t=${refreshKey}`

  const handleRefresh = () => {
    setRefreshKey(Date.now())
  }

  return (
    <div className="flex h-full flex-col border-l border-zinc-800 bg-zinc-900/30">
      {/* Barra de Ferramentas do PDF */}
      <div className="flex h-10 items-center justify-between border-b border-zinc-800 bg-zinc-900/60 px-3">
        <div className="flex items-center space-x-2 text-xs font-semibold text-zinc-300">
          <span>PRÉ-VISUALIZAÇÃO</span>
          {isCompiling ? (
            <span className="flex items-center text-amber-400 font-normal">
              <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
              Compilando...
            </span>
          ) : hasPdf ? (
            <span className="text-[10px] text-zinc-500 font-normal">
              {lastCompiledAt ? new Date(lastCompiledAt).toLocaleTimeString() : 'Pronto'}
            </span>
          ) : null}
        </div>

        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setZoom((z) => Math.max(z - 15, 50))}
            className="h-7 w-7 p-0 text-zinc-400 hover:text-zinc-200"
            title="Reduzir Zoom"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </Button>

          <span className="text-[11px] text-zinc-400 font-mono w-9 text-center">{zoom}%</span>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setZoom((z) => Math.min(z + 15, 200))}
            className="h-7 w-7 p-0 text-zinc-400 hover:text-zinc-200"
            title="Aumentar Zoom"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            className="h-7 w-7 p-0 text-zinc-400 hover:text-zinc-200"
            title="Recarregar Visualizador"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>

          {hasPdf && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="h-7 border-zinc-700 bg-zinc-800 text-xs text-zinc-200 hover:bg-zinc-700"
            >
              <a href={pdfUrl} download={`underleaf-${projectId}.pdf`}>
                <Download className="mr-1.5 h-3 w-3" />
                Download
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Conteúdo do PDF */}
      <div className="flex-1 overflow-auto bg-zinc-950 p-2 flex items-center justify-center">
        {hasPdf ? (
          <div
            className="h-full w-full transition-transform duration-150 origin-top flex justify-center"
            style={{ transform: `scale(${zoom / 100})` }}
          >
            <iframe
              src={pdfUrl}
              title="Visualizador de PDF LaTeX"
              className="h-full w-full rounded border border-zinc-800 bg-white shadow-2xl"
            />
          </div>
        ) : (
          <div className="text-center p-8 text-zinc-500">
            <p className="text-sm">Nenhum PDF compilado ainda.</p>
            <p className="mt-1 text-xs">Pressione Ctrl+Enter ou clique em "Recompilar" para gerar o documento.</p>
          </div>
        )}
      </div>
    </div>
  )
}
