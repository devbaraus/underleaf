import { createClientOnlyFn } from '@tanstack/react-start'
import Editor, { type BeforeMount, loader, type OnMount } from '@monaco-editor/react'
import { appConfig } from '#/config'
import { citationContext, type CitationEntry } from '#/lib/latex/bibliography'
import * as decoding from 'lib0/decoding'
import * as encoding from 'lib0/encoding'
import { Bold, Italic, List, Redo2, Undo2 } from 'lucide-react'
import type { editor as MonacoEditor, Position as MonacoPosition } from 'monaco-editor'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { registerLaTeXLanguage } from 'monaco-latex'
import { useEffect, useRef, useState } from 'react'

interface CompileError {
	file: string
	line: number
	message: string
	severity: 'error' | 'warning'
}

interface MonacoLatexEditorProps {
	projectId: string
	fileId: string
	readOnly?: boolean
	onStatus: (status: 'connecting' | 'connected' | 'disconnected') => void
	fileName: string
	onCompile: () => void
	onFlushReady: (flush: (() => Promise<void>) | null) => void
	onPdfStatus?: (status: 'compiling' | 'compiled' | 'error', compilerUserId?: string) => void
	currentUser?: { id?: string; name?: string; email?: string } | null
	errors?: CompileError[]
	citations?: CitationEntry[]
}

const PEER_COLORS = [
	'#3b82f6', // blue
	'#10b981', // emerald
	'#f59e0b', // amber
	'#ec4899', // pink
	'#8b5cf6', // purple
	'#06b6d4', // cyan
	'#f97316', // orange
	'#14b8a6', // teal
	'#e11d48', // rose
	'#84cc16', // lime
]

export function getPeerColor(idOrName: string): string {
	let hash = 0
	for (let i = 0; i < idOrName.length; i++) {
		hash = (hash << 5) - hash + idOrName.charCodeAt(i)
		hash |= 0
	}
	return PEER_COLORS[Math.abs(hash) % PEER_COLORS.length]
}

// Usa o monaco-editor instalado em vez da cópia do CDN (0.55.1) que o @monaco-editor/react
// carrega por padrão, assim editor, monaco-latex e tipos compartilham a mesma versão.
// Só no cliente: o monaco acessa `window`.
let monacoSetup: Promise<void> | undefined
const setupLocalMonaco = createClientOnlyFn(() => {
	monacoSetup ??= (async () => {
		const [monaco, { default: EditorWorker }] = await Promise.all([
			import('monaco-editor/editor/editor.api'),
			import('monaco-editor/editor/editor.worker?worker'),
		])
		// editor.api does not register the suggestion widget or snippet controller.
		// Load both before creating the editor so LaTeX providers can display completions.
		await Promise.all([
			import('monaco-editor/editor/contrib/suggest/browser/suggestController'),
			import('monaco-editor/features/snippet/register'),
		])
		self.MonacoEnvironment = { getWorker: () => new EditorWorker() }
		loader.config({ monaco })
	})()
	return monacoSetup
})

// Keep Nitro from merging the browser-only binding into its server-side Yjs chunk.
const loadMonacoBinding = createClientOnlyFn(() => import('y-monaco'))

const EDITOR_OPTIONS = {
	readOnly: true,
	minimap: { enabled: false },
	fontSize: 13,
	lineNumbers: 'on',
	scrollBeyondLastLine: false,
	automaticLayout: true,
	wordWrap: 'on',
	padding: { top: 8, bottom: 8 },
	suggestOnTriggerCharacters: true,
	quickSuggestions: { other: true, comments: false, strings: true },
	snippetSuggestions: 'top',
	tabSize: 2,
	renderWhitespace: 'selection',
} as const

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
	projectId,
	fileId,
	readOnly = false,
	onStatus,
	fileName,
	onCompile,
	onFlushReady,
	onPdfStatus,
	currentUser,
	errors = [],
	citations = [],
}: MonacoLatexEditorProps) {
	const editorRef = useRef<MonacoEditor.IStandaloneCodeEditor | null>(null)
	const monacoRef = useRef<Parameters<BeforeMount>[0] | null>(null)
	const undoRef = useRef<Y.UndoManager | null>(null)
	const citationsRef = useRef(citations)
	citationsRef.current = citations
	const currentUserRef = useRef(currentUser)
	currentUserRef.current = currentUser
	const [canEdit, setCanEdit] = useState(false)
	const [history, setHistory] = useState({ undo: false, redo: false })
	const [mounted, setMounted] = useState(false)
	const callbacks = useRef({ onStatus, onCompile, onFlushReady, onPdfStatus })
	callbacks.current = { onStatus, onCompile, onFlushReady, onPdfStatus }
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
		editor.onDidChangeConfiguration((event) => {
			if (event.hasChanged(monaco.editor.EditorOption.readOnly)) {
				setCanEdit(!editor.getOption(monaco.editor.EditorOption.readOnly))
			}
		})
		// drop refs once monaco disposes the editor (unmount, HMR) so effects never touch a dead instance
		editor.onDidDispose(() => {
			editorRef.current = null
			monacoRef.current = null
		})

		setMounted(true)

		// Atalho Ctrl+Enter ou Cmd+Enter para compilar
		editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
			callbacks.current.onCompile()
		})
	}

	useEffect(() => {
		if (!mounted) return
		const editor = editorRef.current
		const model = editor?.getModel()
		if (!editor || !model) return
		let disposed = false
		let cleanup: (() => void) | undefined
		callbacks.current.onStatus('connecting')
		editor.updateOptions({ readOnly: true })
		// y-monaco imports Monaco; load after browser-only Monaco setup.
		loadMonacoBinding().then(({ MonacoBinding }) => {
			if (disposed) return
			const doc = new Y.Doc()
			const url = new URL(appConfig.apiUrl, window.location.origin)
			url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:'
			url.pathname = `${url.pathname.replace(/\/$/, '')}/api/collaboration/${projectId}`
			const provider = new WebsocketProvider(url.toString().replace(/\/$/, ''), fileId, doc, {
				disableBc: true,
			})
			let sequence = 0
			const barriers = new Map<
				number,
				{
					resolve: () => void
					reject: (error: Error) => void
					timer: ReturnType<typeof setTimeout>
				}
			>()
			provider.messageHandlers[4] = (_encoder, decoder) => {
				const id = decoding.readVarUint(decoder)
				const pending = barriers.get(id)
				if (!pending) return
				clearTimeout(pending.timer)
				barriers.delete(id)
				pending.resolve()
			}
			provider.messageHandlers[5] = (_encoder, decoder) => {
				const status = decoding.readVarString(decoder) as 'compiling' | 'compiled' | 'error'
				const compilerUserId = decoding.readVarString(decoder)
				callbacks.current.onPdfStatus?.(status, compilerUserId)
			}
			callbacks.current.onFlushReady(
				() =>
					new Promise<void>((resolve, reject) => {
						if (!provider.wsconnected || !provider.synced) {
							reject(new Error('Aguarde a conexão para compilar'))
							return
						}
						const id = ++sequence
						const timer = setTimeout(() => {
							barriers.delete(id)
							reject(new Error('A sincronização demorou. Tente novamente.'))
						}, 10_000)
						barriers.set(id, { resolve, reject, timer })
						const encoder = encoding.createEncoder()
						encoding.writeVarUint(encoder, 4)
						encoding.writeVarUint(encoder, id)
						provider.ws?.send(encoding.toUint8Array(encoder))
					}),
			)
			const binding = new MonacoBinding(
				doc.getText('content'),
				model,
				new Set([editor]),
				provider.awareness,
			)

			// Registra o usuário local no protocolo de awareness do Yjs
			const currentU = currentUserRef.current
			const localColor = currentU?.id
				? getPeerColor(currentU.id)
				: getPeerColor(String(doc.clientID))

			provider.awareness.setLocalStateField('user', {
				id: currentU?.id,
				name: currentU?.name || currentU?.email?.split('@')[0] || 'Colaborador',
				color: localColor,
			})

			// Elemento de estilo dinâmico para renderizar cores e nomes nos cursores dos peers
			const styleEl = document.createElement('style')
			styleEl.setAttribute('type', 'text/css')
			styleEl.setAttribute('data-yjs-monaco-cursors', fileId)
			document.head.appendChild(styleEl)

			const updatePeerStyles = () => {
				let css = `
.yRemoteSelection {
	opacity: 0.35;
	transition: background-color 0.15s ease;
}
.yRemoteSelectionHead {
	position: absolute;
	box-sizing: border-box;
	height: 100%;
	border-left: 2px solid #3b82f6;
}
`
				provider.awareness.getStates().forEach((state: any, clientID: number) => {
					if (clientID === doc.clientID) return
					const peerUser = state?.user
					const color = peerUser?.color || getPeerColor(String(clientID))
					const rawName = peerUser?.name || 'Colaborador'
					const safeName = rawName.replace(/\\/g, '\\\\').replace(/"/g, '\\"')

					css += `
.yRemoteSelection-${clientID} {
	background-color: ${color}40 !important;
}
.yRemoteSelectionHead-${clientID} {
	border-left: 2px solid ${color} !important;
}
.yRemoteSelectionHead-${clientID}::after {
	content: "${safeName}";
	position: absolute;
	top: -1.35em;
	left: -2px;
	font-size: 10px;
	line-height: 1.2;
	font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
	font-weight: 600;
	background-color: ${color};
	color: #ffffff;
	padding: 1px 4px;
	border-radius: 3px 3px 3px 0;
	white-space: nowrap;
	pointer-events: none;
	user-select: none;
	z-index: 100;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
}
`
				})
				styleEl.textContent = css
			}

			provider.awareness.on('change', updatePeerStyles)
			updatePeerStyles()
			const undo = new Y.UndoManager(doc.getText('content'), { trackedOrigins: new Set([binding]) })
			undoRef.current = undo
			const updateHistory = () => setHistory({ undo: undo.canUndo(), redo: undo.canRedo() })
			undo.on('stack-item-added', updateHistory)
			undo.on('stack-item-popped', updateHistory)
			undo.on('stack-cleared', updateHistory)
			updateHistory()
			const monaco = monacoRef.current!
			const runHistory = (action: 'undo' | 'redo') => {
				if (editor.getOption(monaco.editor.EditorOption.readOnly)) return
				undo.stopCapturing()
				undo[action]()
			}
			editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyZ, () => runHistory('undo'))
			editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyZ, () =>
				runHistory('redo'),
			)
			provider.on('status', ({ status }: { status: string }) => {
				if (status !== 'connected') {
					editor.updateOptions({ readOnly: true })
					callbacks.current.onStatus(status === 'disconnected' ? 'disconnected' : 'connecting')
				}
			})
			provider.on('sync', (synced: boolean) => {
				if (!synced) return
				editor.updateOptions({ readOnly })
				callbacks.current.onStatus('connected')
			})
			cleanup = () => {
				if (undoRef.current === undo) undoRef.current = null
				undo.off('stack-item-added', updateHistory)
				undo.off('stack-item-popped', updateHistory)
				undo.off('stack-cleared', updateHistory)
				provider.awareness.off('change', updatePeerStyles)
				styleEl.remove()
				callbacks.current.onFlushReady(null)
				for (const pending of barriers.values()) {
					clearTimeout(pending.timer)
					pending.reject(new Error('Arquivo desconectado'))
				}
				barriers.clear()
				binding.destroy()
				undo.destroy()
				provider.destroy()
				doc.destroy()
			}
		})
		return () => {
			disposed = true
			cleanup?.()
		}
	}, [mounted, projectId, fileId, readOnly])

	useEffect(() => {
		if (!mounted || !monacoRef.current) return
		const monaco = monacoRef.current
		const provider = monaco.languages.registerCompletionItemProvider('latex', {
			triggerCharacters: ['{', ','],
			provideCompletionItems(model: MonacoEditor.ITextModel, position: MonacoPosition) {
				// Keep suggestions scoped to this project's editor, even with multiple models.
				if (model !== editorRef.current?.getModel()) return { suggestions: [] }
				const context = citationContext(
					model.getValueInRange({
						startLineNumber: 1,
						startColumn: 1,
						endLineNumber: position.lineNumber,
						endColumn: position.column,
					}),
				)
				if (!context) return { suggestions: [] }
				const suffix =
					/^[^\s,{}]*/.exec(
						model.getLineContent(position.lineNumber).slice(position.column - 1),
					)?.[0] || ''
				const range = {
					startLineNumber: position.lineNumber,
					startColumn: position.column - context.key.length,
					endLineNumber: position.lineNumber,
					endColumn: position.column + suffix.length,
				}
				return {
					incomplete: true,
					suggestions: citationsRef.current
						.filter((entry) => !context.usedKeys.has(entry.key))
						.map((entry) => ({
							label: { label: entry.key, description: entry.title || entry.file },
							kind: monaco.languages.CompletionItemKind.Reference,
							insertText: entry.key,
							filterText: entry.key,
							detail: [entry.author, entry.year, entry.file].filter(Boolean).join(' · '),
							documentation: [entry.title, entry.author, entry.year, entry.file]
								.filter(Boolean)
								.join('\n\n'),
							range,
						})),
				}
			},
		})
		return () => provider.dispose()
	}, [mounted])

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
					err.severity === 'error' ? monaco.MarkerSeverity.Error : monaco.MarkerSeverity.Warning,
				message: err.message,
				startLineNumber: err.line || 1,
				startColumn: 1,
				endLineNumber: err.line || 1,
				endColumn: 100,
			}))

		monaco.editor.setModelMarkers(model, 'latex', markers)
	}, [errors, fileName, mounted])

	const insertLatex = (command: 'textit' | 'textbf' | 'itemize') => {
		const editor = editorRef.current
		const monaco = monacoRef.current
		if (!editor || !monaco || editor.getOption(monaco.editor.EditorOption.readOnly)) return
		const model = editor.getModel()
		const selection = editor.getSelection()
		if (!model || !selection) return

		const selectedText = model.getValueInRange(selection)
		const newline = model.getEOL()
		const isList = command === 'itemize'
		const prefix = isList ? `\\begin{itemize}${newline}  \\item ` : `\\${command}{`
		const content = isList ? selectedText.split(/\r?\n/).join(`${newline}  \\item `) : selectedText
		const suffix = isList ? `${newline}\\end{itemize}` : '}'
		const startOffset = model.getOffsetAt(selection.getStartPosition()) + prefix.length
		undoRef.current?.stopCapturing()
		editor.executeEdits('latex-format', [
			{ range: selection, text: `${prefix}${content}${suffix}`, forceMoveMarkers: true },
		])
		undoRef.current?.stopCapturing()
		const start = model.getPositionAt(startOffset)
		const end = model.getPositionAt(startOffset + content.length)
		editor.setSelection(
			new monaco.Selection(start.lineNumber, start.column, end.lineNumber, end.column),
		)
		editor.focus()
	}

	const changeHistory = (action: 'undo' | 'redo') => {
		const editor = editorRef.current
		const monaco = monacoRef.current
		if (!editor || !monaco || editor.getOption(monaco.editor.EditorOption.readOnly)) return
		undoRef.current?.stopCapturing()
		undoRef.current?.[action]()
		editor.focus()
	}

	const language = fileName.endsWith('.bib')
		? 'bibtex'
		: fileName.endsWith('.tex')
			? 'latex'
			: 'plaintext'

	return (
		<div className="flex h-full w-full flex-col bg-[#1e1e1e]">
			<div
				role="toolbar"
				aria-label="Formatação LaTeX"
				className="flex shrink-0 flex-wrap items-center gap-1 border-b border-zinc-800 px-2 py-1"
			>
				{[
					{
						label: 'Desfazer',
						title: 'Desfazer (Ctrl/Cmd+Z)',
						icon: Undo2,
						disabled: !canEdit || !history.undo,
						action: () => changeHistory('undo'),
					},
					{
						label: 'Refazer',
						title: 'Refazer (Ctrl/Cmd+Shift+Z)',
						icon: Redo2,
						disabled: !canEdit || !history.redo,
						action: () => changeHistory('redo'),
					},
					{
						label: 'Negrito',
						title: 'Negrito — insere \\textbf{texto}',
						icon: Bold,
						disabled: !canEdit || language !== 'latex',
						action: () => insertLatex('textbf'),
					},
					{
						label: 'Itálico',
						title: 'Itálico — insere \\textit{texto}',
						icon: Italic,
						disabled: !canEdit || language !== 'latex',
						action: () => insertLatex('textit'),
					},
					{
						label: 'Lista',
						title: 'Lista — transforma cada linha selecionada em um item',
						icon: List,
						disabled: !canEdit || language !== 'latex',
						action: () => insertLatex('itemize'),
					},
				].map(({ label, title, icon: Icon, disabled, action }) => (
					<button
						key={label}
						type="button"
						title={title}
						disabled={disabled}
						onMouseDown={(event) => event.preventDefault()}
						onClick={action}
						className="flex items-center gap-1 rounded px-2 py-1 text-xs text-zinc-300 hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
					>
						<Icon className="h-3.5 w-3.5" aria-hidden="true" />
						{label}
					</button>
				))}
			</div>
			<div className="min-h-0 flex-1">
				{ready && (
					<Editor
						height="100%"
						language={language}
						theme="vs-dark"
						defaultValue=""
						beforeMount={handleBeforeMount}
						onMount={handleEditorDidMount}
						options={EDITOR_OPTIONS}
					/>
				)}
			</div>
		</div>
	)
}
