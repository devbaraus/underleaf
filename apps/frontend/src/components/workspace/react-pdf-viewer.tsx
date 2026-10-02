import {
	ChevronLeft,
	ChevronRight,
	Download,
	RefreshCw,
	RotateCw,
	ZoomIn,
	ZoomOut,
} from 'lucide-react'
import type { PDFDocumentProxy, RenderTask } from 'pdfjs-dist'
import * as pdfjs from 'pdfjs-dist'
import { useEffect, useRef, useState } from 'react'

import { Button } from '#/components/ui/button'
import './pdf-text-layer.css'

// Mesma lib que o Overleaf usa para a pré-visualização: pdfjs-dist puro (canvas + text layer),
// sem o wrapper react-pdf. Evita descasamento de versão entre lib e worker.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	'pdfjs-dist/build/pdf.worker.min.mjs',
	import.meta.url,
).toString()

interface ReactPdfViewerProps {
	url: string
	projectId: string
	lastCompiledAt?: string | null
	isCompiling: boolean
	onRefresh: () => void
}

function PdfPage({
	pdfDoc,
	pageNumber,
	scale,
	rotation,
}: {
	pdfDoc: PDFDocumentProxy
	pageNumber: number
	scale: number
	rotation: number
}) {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const textLayerRef = useRef<HTMLDivElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		let cancelled = false
		let renderTask: RenderTask | null = null

		;(async () => {
			const page = await pdfDoc.getPage(pageNumber)
			if (cancelled) return
			const viewport = page.getViewport({ scale, rotation })
			const canvas = canvasRef.current
			const textLayerDiv = textLayerRef.current
			const container = containerRef.current
			if (!canvas || !textLayerDiv || !container) return

			const outputScale = window.devicePixelRatio || 1
			canvas.width = Math.floor(viewport.width * outputScale)
			canvas.height = Math.floor(viewport.height * outputScale)
			canvas.style.width = `${viewport.width}px`
			canvas.style.height = `${viewport.height}px`
			container.style.width = `${viewport.width}px`
			container.style.height = `${viewport.height}px`

			renderTask = page.render({
				canvas,
				viewport,
				transform:
					outputScale !== 1
						? [outputScale, 0, 0, outputScale, 0, 0]
						: undefined,
			})
			await renderTask.promise
			if (cancelled) return

			textLayerDiv.replaceChildren()
			textLayerDiv.style.width = `${viewport.width}px`
			textLayerDiv.style.height = `${viewport.height}px`
			const textContent = await page.getTextContent()
			if (cancelled) return
			await new pdfjs.TextLayer({
				textContentSource: textContent,
				container: textLayerDiv,
				viewport,
			}).render()
		})().catch((err) => {
			if (!cancelled)
				console.error('[PdfPage] falha ao renderizar página:', err)
		})

		return () => {
			cancelled = true
			renderTask?.cancel()
		}
	}, [pdfDoc, pageNumber, scale, rotation])

	return (
		<div ref={containerRef} className='relative shadow-2xl'>
			<canvas
				ref={canvasRef}
				className='block rounded border border-zinc-800 shadow-xl'
			/>
			<div ref={textLayerRef} className='textLayer' />
		</div>
	)
}

export function ReactPdfViewer({
	url,
	projectId,
	lastCompiledAt,
	isCompiling,
	onRefresh,
}: ReactPdfViewerProps) {
	const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null)
	const [loadError, setLoadError] = useState<string | null>(null)
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [scale, setScale] = useState<number>(1.0)
	const [rotation, setRotation] = useState<number>(0)
	const [isSinglePage, setIsSinglePage] = useState<boolean>(false)

	const numPages = pdfDoc?.numPages ?? null

	useEffect(() => {
		let cancelled = false
		setPdfDoc(null)
		setLoadError(null)
		const loadingTask = pdfjs.getDocument({ url, withCredentials: true })
		loadingTask.promise.then(
			(doc) => {
				if (cancelled) return
				setPdfDoc(doc)
				setCurrentPage(1)
			},
			(err) => {
				if (cancelled) return
				console.error('[ReactPdfViewer] falha ao carregar PDF:', err)
				setLoadError(err?.message || 'Erro desconhecido')
			},
		)
		return () => {
			cancelled = true
			loadingTask.destroy()
		}
	}, [url])

	const handleZoomIn = () => {
		setScale((prev) => Math.min(prev + 0.15, 2.5))
	}

	const handleZoomOut = () => {
		setScale((prev) => Math.max(prev - 0.15, 0.4))
	}

	const handleRotate = () => {
		setRotation((prev) => (prev + 90) % 360)
	}

	const handlePrevPage = () => {
		setCurrentPage((prev) => Math.max(prev - 1, 1))
	}

	const handleNextPage = () => {
		if (!numPages) return
		setCurrentPage((prev) => Math.min(prev + 1, numPages))
	}

	return (
		<div className='flex h-full w-full flex-col bg-zinc-950 text-zinc-100'>
			{/* Barra de Ferramentas */}
			<div className='flex h-10 items-center justify-between border-b border-zinc-800 bg-zinc-900/80 px-3 select-none'>
				{/* Lado Esquerdo: Status da Compilação */}
				<div className='flex items-center space-x-2 text-xs font-semibold text-zinc-300'>
					<span>PRÉ-VISUALIZAÇÃO</span>
					{isCompiling ? (
						<span className='flex items-center font-normal text-amber-400'>
							<RefreshCw className='mr-1 h-3 w-3 animate-spin' />
							Compilando...
						</span>
					) : (
						<span className='font-normal text-[10px] text-zinc-500'>
							{lastCompiledAt
								? new Date(lastCompiledAt).toLocaleTimeString()
								: 'Pronto'}
						</span>
					)}
				</div>

				{/* Lado Direito: Controles */}
				<div className='flex items-center space-x-1'>
					{/* Paginação */}
					{numPages && (
						<div className='mr-2 flex items-center space-x-1'>
							<Button
								variant='ghost'
								size='sm'
								onClick={handlePrevPage}
								disabled={currentPage <= 1}
								className='h-7 w-7 p-0 text-zinc-400 hover:text-zinc-200 disabled:opacity-30'
								title='Página Anterior'
							>
								<ChevronLeft className='h-4 w-4' />
							</Button>
							<span className='font-mono text-[11px] text-zinc-300'>
								{currentPage} / {numPages}
							</span>
							<Button
								variant='ghost'
								size='sm'
								onClick={handleNextPage}
								disabled={currentPage >= numPages}
								className='h-7 w-7 p-0 text-zinc-400 hover:text-zinc-200 disabled:opacity-30'
								title='Próxima Página'
							>
								<ChevronRight className='h-4 w-4' />
							</Button>
							<Button
								variant='ghost'
								size='sm'
								onClick={() => setIsSinglePage((prev) => !prev)}
								className={`h-7 px-2 text-[11px] ${
									isSinglePage
										? 'bg-zinc-800 text-emerald-400'
										: 'text-zinc-400 hover:text-zinc-200'
								}`}
								title={
									isSinglePage ? 'Modo: Página Única' : 'Modo: Rolagem Contínua'
								}
							>
								{isSinglePage ? '1 Pág' : 'Todas'}
							</Button>
						</div>
					)}

					{/* Zoom */}
					<Button
						variant='ghost'
						size='sm'
						onClick={handleZoomOut}
						className='h-7 w-7 p-0 text-zinc-400 hover:text-zinc-200'
						title='Reduzir Zoom'
					>
						<ZoomOut className='h-3.5 w-3.5' />
					</Button>

					<span className='w-12 text-center font-mono text-[11px] text-zinc-400'>
						{Math.round(scale * 100)}%
					</span>

					<Button
						variant='ghost'
						size='sm'
						onClick={handleZoomIn}
						className='h-7 w-7 p-0 text-zinc-400 hover:text-zinc-200'
						title='Aumentar Zoom'
					>
						<ZoomIn className='h-3.5 w-3.5' />
					</Button>

					{/* Rotação */}
					<Button
						variant='ghost'
						size='sm'
						onClick={handleRotate}
						className='h-7 w-7 p-0 text-zinc-400 hover:text-zinc-200'
						title='Girar 90°'
					>
						<RotateCw className='h-3.5 w-3.5' />
					</Button>

					{/* Recarregar */}
					<Button
						variant='ghost'
						size='sm'
						onClick={onRefresh}
						className='h-7 w-7 p-0 text-zinc-400 hover:text-zinc-200'
						title='Recarregar Visualizador'
					>
						<RefreshCw className='h-3.5 w-3.5' />
					</Button>

					{/* Download */}
					<Button
						render={<a href={url} download={`underleaf-${projectId}.pdf`} />}
						variant='outline'
						size='sm'
						className='h-7 border-zinc-700 bg-zinc-800 text-xs text-zinc-200 hover:bg-zinc-700'
						nativeButton
					>
						<Download className='mr-1.5 h-3 w-3' />
						Download
					</Button>
				</div>
			</div>

			{/* Área de Visualização do Documento */}
			<div className='flex-1 overflow-auto p-4 flex justify-center bg-zinc-950'>
				{loadError ? (
					<div className='flex h-64 flex-col items-center justify-center text-zinc-400'>
						<p className='text-sm text-red-400'>
							Erro ao carregar o documento PDF.
						</p>
						<p className='mt-1 text-xs text-zinc-500'>{loadError}</p>
					</div>
				) : !pdfDoc ? (
					<div className='flex h-64 flex-col items-center justify-center text-zinc-400'>
						<RefreshCw className='mb-2 h-6 w-6 animate-spin text-emerald-500' />
						<p className='text-xs'>Carregando documento PDF...</p>
					</div>
				) : isSinglePage ? (
					<PdfPage
						pdfDoc={pdfDoc}
						pageNumber={currentPage}
						scale={scale}
						rotation={rotation}
					/>
				) : (
					<div className='flex flex-col items-center space-y-4'>
						{Array.from({ length: numPages ?? 0 }, (_, index) => (
							<PdfPage
								key={`page_${index + 1}`}
								pdfDoc={pdfDoc}
								pageNumber={index + 1}
								scale={scale}
								rotation={rotation}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default ReactPdfViewer
