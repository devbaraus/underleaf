import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Check, Play, Save } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { toast } from 'sonner'

import { Button } from '#/components/ui/button'
import { CompileDrawer } from '#/components/workspace/compile-drawer'
import { FileTree } from '#/components/workspace/file-tree'
import { MonacoLatexEditor } from '#/components/workspace/monaco-editor'
import { PdfPreviewer } from '#/components/workspace/pdf-previewer'
import { appConfig } from '#/config'

export const Route = createFileRoute('/(app)/projects/$projectId')({
	component: WorkspacePage,
})

function WorkspacePage() {
	const { projectId } = Route.useParams()
	const queryClient = useQueryClient()

	const [activeFile, setActiveFile] = useState<string>('main.tex')
	const [editorContent, setEditorContent] = useState<string>('')
	const [isSaved, setIsSaved] = useState<boolean>(true)
	const [compileErrors, setCompileErrors] = useState<any[]>([])
	const [rawLogs, setRawLogs] = useState<string>('')

	// 1. Busca dados do projeto e arquivos
	const { data: project, isLoading } = useQuery({
		queryKey: ['project', projectId],
		queryFn: async () => {
			const res = await fetch(`${appConfig.apiUrl}/api/projects/${projectId}`, {
				credentials: 'include',
			})
			if (!res.ok) throw new Error('Falha ao carregar projeto')
			return res.json()
		},
	})

	// Sincroniza conteúdo ao trocar de arquivo ativo
	useEffect(() => {
		if (!project?.files) return
		const file = project.files.find((f: any) => f.path === activeFile)
		if (file) {
			setEditorContent(file.content)
			setIsSaved(true)
		}
	}, [activeFile, project])

	// 2. Salva arquivo
	const saveMutation = useMutation({
		mutationFn: async () => {
			const file = project?.files?.find((f: any) => f.path === activeFile)
			if (!file) return

			const res = await fetch(
				`${appConfig.apiUrl}/api/projects/${projectId}/files/${file.id}`,
				{
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include',
					body: JSON.stringify({ content: editorContent }),
				},
			)
			if (!res.ok) throw new Error('Falha ao salvar arquivo')
			return res.json()
		},
		onSuccess: () => {
			setIsSaved(true)
			queryClient.invalidateQueries({ queryKey: ['project', projectId] })
			toast.success('Salvo!')
		},
		onError: (err: any) => {
			toast.error(err.message || 'Erro ao salvar arquivo')
		},
	})

	// 3. Cria novo arquivo
	const createFileMutation = useMutation({
		mutationFn: async ({ name, path }: { name: string; path: string }) => {
			const res = await fetch(
				`${appConfig.apiUrl}/api/projects/${projectId}/files`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include',
					body: JSON.stringify({ name, path, content: '' }),
				},
			)
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
			const res = await fetch(
				`${appConfig.apiUrl}/api/projects/${projectId}/files/${fileId}`,
				{
					method: 'DELETE',
					credentials: 'include',
				},
			)
			if (!res.ok) throw new Error('Falha ao excluir arquivo')
			return res.json()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['project', projectId] })
			setActiveFile('main.tex')
			toast.success('Arquivo removido!')
		},
	})

	// 5. Compilação LaTeX com Tectonic
	const compileMutation = useMutation({
		mutationFn: async () => {
			const res = await fetch(
				`${appConfig.apiUrl}/api/projects/${projectId}/compile`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include',
					body: JSON.stringify({
						unsavedFiles: [{ path: activeFile, content: editorContent }],
					}),
				},
			)

			const data = await res.json()
			return { status: res.status, data }
		},
		onSuccess: ({ status, data }) => {
			setIsSaved(true)
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

	const handleEditorChange = (newContent: string) => {
		setEditorContent(newContent)
		setIsSaved(false)
	}

	const handleCompile = () => {
		compileMutation.mutate()
	}

	if (isLoading) {
		return (
			<div className='flex h-screen items-center justify-center bg-zinc-950 text-sm text-zinc-400'>
				Carregando workspace do projeto...
			</div>
		)
	}

	return (
		<div className='flex h-[calc(100vh-3.5rem)] flex-col bg-zinc-950 text-zinc-100 overflow-hidden'>
			{/* Barra de Ações do Workspace */}
			<div className='flex h-11 items-center justify-between border-b border-zinc-800 bg-zinc-900/70 px-3'>
				<div className='flex items-center space-x-3'>
					<Button
						asChild
						variant='ghost'
						size='sm'
						className='h-7 px-2 text-xs text-zinc-400 hover:text-zinc-200'
					>
						<Link to='/projects'>
							<ArrowLeft className='mr-1 h-3.5 w-3.5' />
							Projetos
						</Link>
					</Button>

					<span className='text-zinc-700'>|</span>

					<span className='font-semibold text-xs text-zinc-200'>
						{project?.title}
					</span>
					<span className='text-[11px] text-zinc-500'>({activeFile})</span>
					{!isSaved && (
						<span className='rounded bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-medium text-amber-400'>
							Modificado
						</span>
					)}
				</div>

				<div className='flex items-center space-x-2'>
					<Button
						variant='outline'
						size='sm'
						onClick={() => saveMutation.mutate()}
						disabled={isSaved || saveMutation.isPending}
						className='h-7 border-zinc-700 bg-zinc-800 text-xs text-zinc-300 hover:bg-zinc-700'
					>
						{isSaved ? (
							<>
								<Check className='mr-1 h-3 w-3 text-emerald-400' />
								Salvo
							</>
						) : (
							<>
								<Save className='mr-1 h-3 w-3' />
								Salvar
							</>
						)}
					</Button>

					<Button
						size='sm'
						onClick={handleCompile}
						disabled={compileMutation.isPending}
						className='h-7 bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white shadow-sm'
					>
						<Play className='mr-1.5 h-3.5 w-3.5 fill-current' />
						{compileMutation.isPending
							? 'Compilando...'
							: 'Recompilar (Ctrl+Enter)'}
					</Button>
				</div>
			</div>

			{/* Painéis Redimensionáveis */}
			<div className='flex-1 overflow-hidden'>
				<PanelGroup direction='horizontal'>
					{/* Painel 1: Árvore de Arquivos */}
					<Panel defaultSize={18} minSize={12} maxSize={30}>
						<FileTree
							files={project?.files || []}
							activeFile={activeFile}
							onSelectFile={setActiveFile}
							onCreateFile={(name, path) =>
								createFileMutation.mutate({ name, path })
							}
							onDeleteFile={(fileId) => deleteFileMutation.mutate(fileId)}
						/>
					</Panel>

					<PanelResizeHandle className='w-1 bg-zinc-800 hover:bg-emerald-500 transition-colors cursor-col-resize' />

					{/* Painel 2: Editor Monaco + Drawer de Erros */}
					<Panel defaultSize={42} minSize={25}>
						<div className='flex h-full flex-col'>
							<div className='flex-1 overflow-hidden'>
								<MonacoLatexEditor
									value={editorContent}
									fileName={activeFile}
									onChange={handleEditorChange}
									onCompile={handleCompile}
									errors={compileErrors}
								/>
							</div>

							{/* Drawer de Compilação */}
							<CompileDrawer errors={compileErrors} rawLogs={rawLogs} />
						</div>
					</Panel>

					<PanelResizeHandle className='w-1 bg-zinc-800 hover:bg-emerald-500 transition-colors cursor-col-resize' />

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
