import { useState } from 'react'
import { File, Plus, Trash2, CheckCircle2 } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'

interface ProjectFile {
  id: string
  name: string
  path: string
  isMain: boolean
  type: string
}

interface FileTreeProps {
  files: ProjectFile[]
  activeFile: string
  onSelectFile: (path: string) => void
  onCreateFile: (name: string, path: string) => void
  onDeleteFile: (fileId: string) => void
}

export function FileTree({
  files,
  activeFile,
  onSelectFile,
  onCreateFile,
  onDeleteFile,
}: FileTreeProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [newFileName, setNewFileName] = useState('')

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newFileName.trim()) return
    onCreateFile(newFileName.trim(), newFileName.trim())
    setNewFileName('')
    setIsCreating(false)
  }

  return (
    <div className="flex h-full flex-col border-r border-zinc-800 bg-zinc-900/40 text-zinc-300">
      <div className="flex items-center justify-between border-b border-zinc-800 px-3 py-2 text-xs font-semibold text-zinc-400">
        <span>ARQUIVOS</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCreating(true)}
          className="h-6 w-6 p-0 hover:bg-zinc-800 hover:text-emerald-400"
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>

      {isCreating && (
        <form onSubmit={handleCreate} className="border-b border-zinc-800 p-2">
          <Input
            autoFocus
            placeholder="nome.tex"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            className="h-7 text-xs border-zinc-700 bg-zinc-800"
          />
        </form>
      )}

      <div className="flex-1 overflow-y-auto p-1 space-y-0.5">
        {files.map((file) => {
          const isActive = activeFile === file.path
          return (
            <div
              key={file.id}
              onClick={() => onSelectFile(file.path)}
              className={`group flex items-center justify-between rounded px-2.5 py-1.5 text-xs font-medium cursor-pointer transition ${
                isActive
                  ? 'bg-zinc-800 text-emerald-400 font-semibold'
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
              }`}
            >
              <div className="flex items-center space-x-2 truncate">
                <File className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{file.path}</span>
                {file.isMain && (
                  <span className="rounded bg-emerald-500/20 px-1 py-0.2 text-[9px] font-bold text-emerald-400">
                    MAIN
                  </span>
                )}
              </div>

              {!file.isMain && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (confirm(`Excluir ${file.path}?`)) onDeleteFile(file.id)
                  }}
                  className="opacity-0 group-hover:opacity-100 hover:text-red-400"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
