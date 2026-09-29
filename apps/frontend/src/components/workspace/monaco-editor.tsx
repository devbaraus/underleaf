import { useRef, useEffect } from 'react'
import Editor, { type OnMount } from '@monaco-editor/react'

interface CompileError {
  file: string
  line: number
  message: string
  severity: 'error' | 'warning'
}

interface MonacoLatexEditorProps {
  value: string
  fileName: string
  onChange: (value: string) => void
  onCompile: () => void
  errors?: CompileError[]
}

export function MonacoLatexEditor({
  value,
  fileName,
  onChange,
  onCompile,
  errors = [],
}: MonacoLatexEditorProps) {
  const editorRef = useRef<any>(null)
  const monacoRef = useRef<any>(null)

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor
    monacoRef.current = monaco

    // Atalho Ctrl+Enter ou Cmd+Enter para compilar
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      onCompile()
    })
  }

  // Atualiza marcadores de erro no editor
  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) return
    const monaco = monacoRef.current
    const model = editorRef.current.getModel()
    if (!model) return

    const markers = errors
      .filter((err) => err.file === fileName || !err.file)
      .map((err) => ({
        severity:
          err.severity === 'error'
            ? monaco.MarkerSeverity.Error
            : monaco.MarkerSeverity.Warning,
        message: err.message,
        startLineNumber: err.line || 1,
        startColumn: 1,
        endLineNumber: err.line || 1,
        endColumn: 100,
      }))

    monaco.editor.setModelMarkers(model, 'latex', markers)
  }, [errors, fileName])

  const language = fileName.endsWith('.bib')
    ? 'bibtex'
    : fileName.endsWith('.tex')
      ? 'latex'
      : 'plaintext'

  return (
    <div className="h-full w-full bg-[#1e1e1e]">
      <Editor
        height="100%"
        language={language}
        theme="vs-dark"
        value={value}
        onChange={(val) => onChange(val || '')}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: 'on',
          tabSize: 2,
          renderWhitespace: 'selection',
        }}
      />
    </div>
  )
}
