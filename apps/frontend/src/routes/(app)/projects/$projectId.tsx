import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, FolderUp, Play, Upload } from 'lucide-react'
import { type ChangeEvent, useRef, useState } from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { toast } from 'sonner'

import { Button } from '#/components/ui/button'
import { CompileDrawer } from '#/components/workspace/compile-drawer'
import { FileTree } from '#/components/workspace/file-tree'
import { MonacoLatexEditor } from '#/components/workspace/monaco-editor'
import { PdfPreviewer } from '#/components/workspace/pdf-previewer'
import { ProjectSharing } from '#/components/workspace/project-sharing'
import { appConfig } from '#/config'

const UPLOAD_ACCEPT = '.tex,.bib,image/*'
const TEXT_FILE_EXTENSIONS = new Set(['tex', 'bib'])
const IMAGE_FILE_EXTENSIONS = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'svg'])

function getFileExtension(fileName: string) {
	return fileName.split('.').pop()?.toLowerCase() || ''
}

function readFileAsBase64(file: File) {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = () => {
			const result = String(reader.result)
			resolve(result.slice(result.indexOf(',') + 1))
		}
		reader.onerror = () => reject(new Error(`Falha ao ler ${file.name}`))
		reader.readAsDataURL(file)
	})
}

export const Route = createFileRoute('/(app)/projects/$projectId')({
	component: WorkspacePage,
})

function WorkspacePage() {
	const { projectId } = Route.useParams()
	const queryClient = useQueryClient()
	const uploadInputRef = useRef<HTMLInputElement>(null)
	const folderUploadInputRef = useRef<HTMLInputElement>(null)
	const flushRef = useRef<(() => Promise<void>) | null>(null)

	const [activeFile, setActiveFile] = useState<string>('main.tex')
	const [connectionStatus, setConnectionStatus] = useState<
		'connecting' | 'connected' | 'disconnected'
	>('connecting')
	const [compileErrors, setCompileErrors] = useState<any[]>([])
	const [rawLogs, setRawLogs] = useState<string>('')

	// 1. Busca dados do projeto e arquivos
	const {
		data: project,
		isLoading,
		error: projectError,
	} = useQuery({
		queryKey: ['project', projectId],
		queryFn: async () => {
			const res = await fetch(`${appConfig.apiUrl}/api/projects/${projectId}`, {
				credentials: 'include',
			})
			if (!res.ok) throw new Error('Falha ao carregar projeto')
			return res.json()
		},
	})

	// 3. Cria novo arquivo
	const createFileMutation = useMutation({
		mutationFn: async ({ name, path }: { name: string; path: string }) => {
			const res = await fetch(`${appConfig.apiUrl}/api/projects/${projectId}/files`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({ name, path, content: '' }),
			})
			if (!res.ok) throw new Error('Falha ao criar arquivo')
			return res.json()
		},
		onSuccess: (newFile) => {
			queryClient.invalidateQueries({ queryKey: ['project', projectId] })
			setActiveFile(newFile.path)
			toast.success(`Arquivo ${newFile.name} criado!`)
		},
	})

	// 4. Exclui arquivo
	const deleteFileMutation = useMutation({
		mutationFn: async (fileId: string) => {
			const res = await fetch(`${appConfig.apiUrl}/api/projects/${projectId}/files/${fileId}`, {
				method: 'DELETE',
				credentials: 'include',
			})
			if (!res.ok) throw new Error('Falha ao excluir arquivo')
			return res.json()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['project', projectId] })
			setActiveFile('main.tex')
			toast.success('Arquivo removido!')
		},
	})

	// 5. Envia arquivos mantendo os caminhos e subdiretórios reais
	const uploadFilesMutation = useMutation({
		mutationFn: async (files: File[]) => {
			const uploadedFiles: Array<{ path: string; type: string }> = []

			for (const file of files) {
				const path = file.webkitRelativePath || file.name
				const extension = getFileExtension(file.name)
				const isTextFile = TEXT_FILE_EXTENSIONS.has(extension)
				const isImage = file.type.startsWith('image/') || IMAGE_FILE_EXTENSIONS.has(extension)

				if (!isTextFile && !isImage) {
					throw new Error(`Formato não permitido: ${path}`)
				}

				const content = isTextFile ? await file.text() : await readFileAsBase64(file)
				const res = await fetch(`${appConfig.apiUrl}/api/projects/${projectId}/files`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include',
					body: JSON.stringify({
						name: file.name,
						path,
						content,
						type: isTextFile ? extension : 'image',
					}),
				})

				if (!res.ok) {
					throw new Error(
						res.status === 409 ? `O arquivo ${path} já existe` : `Falha ao enviar ${path}`,
					)
				}

				uploadedFiles.push(await res.json())
			}

			return uploadedFiles
		},
		onSuccess: (uploadedFiles) => {
			queryClient.invalidateQueries({ queryKey: ['project', projectId] })
			const firstEditableFile = uploadedFiles.find((file) => TEXT_FILE_EXTENSIONS.has(file.type))
			if (firstEditableFile) setActiveFile(firstEditableFile.path)
			toast.success(
				`${uploadedFiles.length} arquivo${uploadedFiles.length === 1 ? '' : 's'} enviado${uploadedFiles.length === 1 ? '' : 's'}!`,
			)
		},
		onError: (err: Error) => {
			queryClient.invalidateQueries({ queryKey: ['project', projectId] })
			toast.error(err.message || 'Erro ao enviar arquivos')
		},
	})

	// 6. Compilação LaTeX com Tectonic
	const compileMutation = useMutation({
		mutationFn: async () => {
			if (!flushRef.current) throw new Error('Aguarde a sincronização do editor')
			await flushRef.current()
			const res = await fetch(`${appConfig.apiUrl}/api/projects/${projectId}/compile`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({}),
			})

			const data = await res.json()
			return { status: res.status, data }
		},
		onSuccess: ({ status, data }) => {
			setCompileErrors(data.errors || [])
			setRawLogs(data.rawOutput || '')
			queryClient.invalidateQueries({ queryKey: ['project', projectId] })

			if (data.success) {
				toast.success(`Compilado com sucesso em ${data.durationMs}ms!`)
			} else {
				toast.error('Erro na compilação do LaTeX')
			}
		},
		onError: (err: any) => {
			toast.error(err.message || 'Erro ao solicitar compilação')
		},
	})

	const handleCompile = () => {
		if (connectionStatus === 'connected' && project?.canWrite) compileMutation.mutate()
	}

	const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(event.target.files || [])
		if (files.length) uploadFilesMutation.mutate(files)
		event.target.value = ''
	}

	if (projectError)
		return (
			<div className="p-6 text-sm text-zinc-400">
				Projeto indisponível ou sem permissão de acesso.
			</div>
		)

	if (isLoading) {
		return (
			<div className="flex h-screen items-center justify-center bg-zinc-950 text-sm text-zinc-400">
				Carregando workspace do projeto...
			</div>
		)
	}

	return (
		<div className="flex h-[calc(100vh-3.5rem)] flex-col bg-zinc-950 text-zinc-100 overflow-hidden">
			{/* Barra de Ações do Workspace */}
			<div className="flex h-11 items-center justify-between border-b border-zinc-800 bg-zinc-900/70 px-3">
				<div className="flex items-center space-x-3">
					<Button
						render={<Link to="/projects" />}
						nativeButton
						variant="ghost"
						size="sm"
						className="h-7 px-2 text-xs text-zinc-400 hover:text-zinc-200"
					>
						<ArrowLeft className="mr-1 h-3.5 w-3.5" />
						Projetos
					</Button>

					<span className="text-zinc-700">|</span>

					<span className="font-semibold text-xs text-zinc-200">{project?.title}</span>
					<span className="text-[11px] text-zinc-500">({activeFile})</span>
					<span className="text-[11px] text-zinc-400">
						{connectionStatus === 'connected'
							? project?.canWrite
								? 'Edição ao vivo · salvamento automático'
								: 'Somente leitura · ao vivo'
							: connectionStatus === 'disconnected'
								? 'Desconectado · reconectando...'
								: 'Sincronizando...'}
					</span>
				</div>

				<div className="flex items-center space-x-2">
					<input
						ref={uploadInputRef}
						type="file"
						accept={UPLOAD_ACCEPT}
						multiple
						onChange={handleFileUpload}
						className="hidden"
					/>
					<input
						ref={(element) => {
							folderUploadInputRef.current = element
							element?.setAttribute('webkitdirectory', '')
						}}
						type="file"
						accept={UPLOAD_ACCEPT}
						multiple
						onChange={handleFileUpload}
						className="hidden"
					/>
					<Button
						variant="outline"
						size="sm"
						onClick={() => uploadInputRef.current?.click()}
						disabled={!project?.canWrite || uploadFilesMutation.isPending}
						className="h-7 border-zinc-700 bg-zinc-800 px-2 text-xs text-zinc-300 hover:bg-zinc-700"
					>
						<Upload className="mr-1 h-3 w-3" />
						Arquivos
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => folderUploadInputRef.current?.click()}
						disabled={!project?.canWrite || uploadFilesMutation.isPending}
						className="h-7 border-zinc-700 bg-zinc-800 px-2 text-xs text-zinc-300 hover:bg-zinc-700"
					>
						<FolderUp className="mr-1 h-3 w-3" />
						{uploadFilesMutation.isPending ? 'Enviando...' : 'Pasta'}
					</Button>

					{project?.role === 'owner' && <ProjectSharing projectId={projectId} />}

					<Button
						size="sm"
						onClick={handleCompile}
						disabled={
							!project?.canWrite || connectionStatus !== 'connected' || compileMutation.isPending
						}
						className="h-7 bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white shadow-sm"
					>
						<Play className="mr-1.5 h-3.5 w-3.5 fill-current" />
						{compileMutation.isPending ? 'Compilando...' : 'Recompilar (Ctrl+Enter)'}
					</Button>
				</div>
			</div>

			{/* Painéis Redimensionáveis */}
			<div className="flex-1 overflow-hidden">
				<PanelGroup direction="horizontal">
					{/* Painel 1: Árvore de Arquivos */}
					<Panel defaultSize={18} minSize={12} maxSize={30}>
						<FileTree
							files={project?.files || []}
							activeFile={activeFile}
							readOnly={!project?.canWrite}
							onSelectFile={(path) => {
								const file = project?.files?.find((item: { path: string }) => item.path === path)
								if (file?.type === 'image') {
									toast.info('A imagem está disponível para uso no documento.')
									return
								}
								setActiveFile(path)
							}}
							onCreateFile={(name, path) =>
								project?.canWrite && createFileMutation.mutate({ name, path })
							}
							onDeleteFile={(fileId) => {
								if (project?.canWrite) deleteFileMutation.mutate(fileId)
							}}
						/>
					</Panel>

					<PanelResizeHandle className="w-1 bg-zinc-800 hover:bg-emerald-500 transition-colors cursor-col-resize" />

					{/* Painel 2: Editor Monaco + Drawer de Erros */}
					<Panel defaultSize={42} minSize={25}>
						<div className="flex h-full flex-col">
							<div className="flex-1 overflow-hidden">
								<MonacoLatexEditor
									key={project?.files?.find((f: any) => f.path === activeFile)?.id || activeFile}
									projectId={projectId}
									fileId={project?.files?.find((f: any) => f.path === activeFile)?.id || ''}
									readOnly={!project?.canWrite}
									onStatus={(status) => {
										setConnectionStatus(status)
										if (status === 'disconnected')
											queryClient.invalidateQueries({ queryKey: ['project', projectId] })
									}}
									onFlushReady={(flush) => {
										flushRef.current = flush
									}}
									fileName={activeFile}
									onCompile={handleCompile}
									errors={compileErrors}
								/>
							</div>

							{/* Drawer de Compilação */}
							<CompileDrawer errors={compileErrors} rawLogs={rawLogs} />
						</div>
					</Panel>

					<PanelResizeHandle className="w-1 bg-zinc-800 hover:bg-emerald-500 transition-colors cursor-col-resize" />

					{/* Painel 3: Visualizador de PDF */}
					<Panel defaultSize={40} minSize={25}>
						<PdfPreviewer
							projectId={projectId}
							hasPdf={project?.hasPdf || false}
							lastCompiledAt={project?.lastCompiledAt}
							isCompiling={compileMutation.isPending}
						/>
					</Panel>
				</PanelGroup>
			</div>
		</div>
	)
}
