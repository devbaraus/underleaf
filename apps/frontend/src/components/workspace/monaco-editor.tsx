import Editor, {
	type BeforeMount,
	loader,
	type OnMount,
} from '@monaco-editor/react'
import { registerLaTeXLanguage } from 'monaco-latex'
import { useEffect, useRef, useState } from 'react'

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

// Usa o monaco-editor instalado em vez da cópia do CDN (0.55.1) que o @monaco-editor/react
// carrega por padrão, assim editor, monaco-latex e tipos compartilham a mesma versão.
// Só no cliente: o monaco acessa `window`.
let monacoSetup: Promise<void> | undefined
function setupLocalMonaco() {
	monacoSetup ??= (async () => {
		const [monaco, { default: EditorWorker }] = await Promise.all([
			import('monaco-editor/editor/editor.api'),
			import('monaco-editor/editor/editor.worker?worker'),
		])
		self.MonacoEnvironment = { getWorker: () => new EditorWorker() }
		loader.config({ monaco })
	})()
	return monacoSetup
}

let isLatexRegistered = false

function registerLatexOnce(monaco: any) {
	if (isLatexRegistered) return
	try {
		registerLaTeXLanguage(monaco)
		isLatexRegistered = true
	} catch (e) {
		console.error('Failed to register LaTeX language in Monaco:', e)
	}
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
	const [ready, setReady] = useState(false)

	useEffect(() => {
		setupLocalMonaco().then(() => setReady(true))
	}, [])

	const handleBeforeMount: BeforeMount = (monaco) => {
		registerLatexOnce(monaco)
	}

	const handleEditorDidMount: OnMount = (editor, monaco) => {
		registerLatexOnce(monaco)
		editorRef.current = editor
		monacoRef.current = monaco
		// drop refs once monaco disposes the editor (unmount, HMR) so effects never touch a dead instance
		editor.onDidDispose(() => {
			editorRef.current = null
			monacoRef.current = null
		})

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
		if (!model || model.isDisposed()) return

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
		<div className='h-full w-full bg-[#1e1e1e]'>
			{ready && (
				<Editor
					height='100%'
					language={language}
					theme='vs-dark'
					value={value}
					onChange={(val) => onChange(val || '')}
					beforeMount={handleBeforeMount}
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
			)}
		</div>
	)
}
