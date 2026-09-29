import { RefreshCw } from 'lucide-react'
import { Component, type ReactNode, useEffect, useState } from 'react'

import { appConfig } from '#/config'

// Um erro do viewer não pode derrubar a árvore inteira (o Monaco reclama de estar descartado)
class ViewerErrorBoundary extends Component<
	{ children: ReactNode },
	{ error: Error | null }
> {
	state = { error: null as Error | null }
	static getDerivedStateFromError(error: Error) {
		return { error }
	}
	componentDidCatch(error: Error) {
		console.error('[PdfPreviewer] viewer crashed:', error)
	}
	render() {
		const { error } = this.state
		if (!error) return this.props.children
		return (
			<div className='p-4 text-xs text-red-400'>
				<p className='font-semibold'>Erro no visualizador de PDF</p>
				<pre className='mt-2 whitespace-pre-wrap text-zinc-400'>
					{error.message}
				</pre>
			</div>
		)
	}
}

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
	const [refreshKey, setRefreshKey] = useState(Date.now())
	const [ViewerComponent, setViewerComponent] =
		useState<React.ComponentType<any> | null>(null)

	// Carrega o viewer (pdfjs-dist puro) dinamicamente no cliente para garantir compatibilidade com SSR
	useEffect(() => {
		let isMounted = true
		import('./react-pdf-viewer').then((mod) => {
			if (isMounted) {
				setViewerComponent(() => mod.ReactPdfViewer)
			}
		})
		return () => {
			isMounted = false
		}
	}, [])

	// Atualiza automaticamente o visualizador quando uma nova compilação for concluída
	useEffect(() => {
		if (lastCompiledAt) {
			setRefreshKey(Date.now())
		}
	}, [lastCompiledAt])

	const pdfUrl = `${appConfig.apiUrl}/api/projects/${projectId}/pdf?t=${refreshKey}`

	const handleRefresh = () => {
		setRefreshKey(Date.now())
	}

	if (!hasPdf) {
		return (
			<div className='flex h-full flex-col border-l border-zinc-800 bg-zinc-900/30'>
				<div className='flex h-10 items-center justify-between border-b border-zinc-800 bg-zinc-900/60 px-3'>
					<div className='flex items-center space-x-2 text-xs font-semibold text-zinc-300'>
						<span>PRÉ-VISUALIZAÇÃO</span>
						{isCompiling && (
							<span className='flex items-center font-normal text-amber-400'>
								<RefreshCw className='mr-1 h-3 w-3 animate-spin' />
								Compilando...
							</span>
						)}
					</div>
				</div>
				<div className='flex flex-1 items-center justify-center p-8 text-center text-zinc-500'>
					<div>
						<p className='text-sm'>Nenhum PDF compilado ainda.</p>
						<p className='mt-1 text-xs'>
							Pressione Ctrl+Enter ou clique em "Recompilar" para gerar o
							documento.
						</p>
					</div>
				</div>
			</div>
		)
	}

	if (!ViewerComponent) {
		return (
			<div className='flex h-full flex-col border-l border-zinc-800 bg-zinc-900/30'>
				<div className='flex h-10 items-center justify-between border-b border-zinc-800 bg-zinc-900/60 px-3'>
					<div className='flex items-center space-x-2 text-xs font-semibold text-zinc-300'>
						<span>PRÉ-VISUALIZAÇÃO</span>
						{isCompiling && (
							<span className='flex items-center font-normal text-amber-400'>
								<RefreshCw className='mr-1 h-3 w-3 animate-spin' />
								Compilando...
							</span>
						)}
					</div>
				</div>
				<div className='flex flex-1 items-center justify-center p-8 text-zinc-400'>
					<RefreshCw className='mb-2 h-6 w-6 animate-spin text-emerald-500' />
				</div>
			</div>
		)
	}

	return (
		<div className='h-full w-full border-l border-zinc-800'>
			<ViewerErrorBoundary key={refreshKey}>
				<ViewerComponent
					url={pdfUrl}
					projectId={projectId}
					lastCompiledAt={lastCompiledAt}
					isCompiling={isCompiling}
					onRefresh={handleRefresh}
				/>
			</ViewerErrorBoundary>
		</div>
	)
}
