import type { BetterFetchError } from '@better-fetch/fetch'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import {
	ArrowRight,
	BookOpen,
	Clock,
	FileText,
	Plus,
	Trash2,
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '#/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '#/components/ui/card'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '#/components/ui/dialog'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { appConfig } from '#/config'
import { $fetch } from '#/lib/fetch'

export const Route = createFileRoute('/(app)/projects/')({
	component: ProjectsDashboardPage,
})

function ProjectsDashboardPage() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const [isCreateOpen, setIsCreateOpen] = useState(false)
	const [newTitle, setNewTitle] = useState('')
	const [newDescription, setNewDescription] = useState('')
	const [newTemplate, setNewTemplate] = useState('academic-paper')

	const { data: projects = [], isLoading } = useQuery({
		queryKey: ['projects'],
		queryFn: async () => await $fetch('@get/projects', {}),
	})

	const createMutation = useMutation({
		mutationFn: async () =>
			await $fetch(`@post/projects`, {
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					title: newTitle,
					description: newDescription,
					template: newTemplate,
				}),
			}),
		onSuccess: (newProj) => {
			queryClient.invalidateQueries({ queryKey: ['projects'] })
			setIsCreateOpen(false)
			setNewTitle('')
			setNewDescription('')
			toast.success('Projeto criado com sucesso!')
			navigate({
				to: '/projects/$projectId',
				params: { projectId: newProj.id },
			})
		},
		onError: (err: BetterFetchError) => {
			toast.error(err.message || 'Erro ao criar projeto')
		},
	})

	const deleteMutation = useMutation({
		mutationFn: async (id: string) => {
			const res = await $fetch(`@delete/projects/:id`, {
				params: { id },
			})
			return res
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['projects'] })
			toast.success('Projeto excluído!')
		},
		onError: (err: BetterFetchError) => {
			toast.error(err.message || 'Erro ao excluir projeto')
		},
	})

	return (
		<div className='mx-auto max-w-6xl p-6'>
			{/* Top Banner */}
			<div className='mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center'>
				<div>
					<h1 className='font-bold text-3xl tracking-tight text-zinc-100'>
						Seus Projetos LaTeX
					</h1>
					<p className='mt-1 text-sm text-zinc-400'>
						Crie, organize e compile seus documentos científicos com Tectonic em
						tempo real.
					</p>
				</div>

				<Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
					<DialogTrigger>
						<Plus className='mr-2 h-4 w-4' />
						Novo Projeto
					</DialogTrigger>
					<DialogContent className='border-zinc-800 bg-zinc-900 text-zinc-100'>
						<DialogHeader>
							<DialogTitle>Criar Novo Projeto LaTeX</DialogTitle>
							<DialogDescription className='text-zinc-400'>
								Selecione um título e um template para iniciar a estrutura do
								seu documento.
							</DialogDescription>
						</DialogHeader>

						<div className='space-y-4 py-3'>
							<div className='space-y-2'>
								<Label htmlFor='title' className='text-zinc-300'>
									Título do Projeto
								</Label>
								<Input
									id='title'
									placeholder='Ex: Artigo Sobre Inteligência Artificial'
									value={newTitle}
									onChange={(e) => setNewTitle(e.target.value)}
									className='border-zinc-700 bg-zinc-800'
								/>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='desc' className='text-zinc-300'>
									Descrição (opcional)
								</Label>
								<Input
									id='desc'
									placeholder='Breve resumo sobre o artigo'
									value={newDescription}
									onChange={(e) => setNewDescription(e.target.value)}
									className='border-zinc-700 bg-zinc-800'
								/>
							</div>

							<div className='space-y-2'>
								<Label className='text-zinc-300'>Template Inicial</Label>
								<div className='grid grid-cols-3 gap-2'>
									{[
										{
											id: 'academic-paper',
											label: 'Artigo Acadêmico',
											desc: 'Estrutura padrão com bibtex',
										},
										{
											id: 'blank',
											label: 'Em Branco',
											desc: 'Apenas main.tex mínimo',
										},
										{
											id: 'beamer',
											label: 'Apresentação',
											desc: 'Slides via Beamer',
										},
									].map((tpl) => (
										<button
											key={tpl.id}
											type='button'
											onClick={() => setNewTemplate(tpl.id)}
											className={`rounded-lg border p-3 text-left transition ${
												newTemplate === tpl.id
													? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
													: 'border-zinc-800 bg-zinc-800/40 text-zinc-400 hover:border-zinc-700'
											}`}
										>
											<div className='font-semibold text-xs text-zinc-200'>
												{tpl.label}
											</div>
											<div className='mt-1 text-[10px] text-zinc-500'>
												{tpl.desc}
											</div>
										</button>
									))}
								</div>
							</div>
						</div>

						<DialogFooter>
							<Button
								variant='outline'
								onClick={() => setIsCreateOpen(false)}
								className='border-zinc-700 bg-zinc-800 text-zinc-300'
							>
								Cancelar
							</Button>
							<Button
								disabled={!newTitle.trim() || createMutation.isPending}
								onClick={() => createMutation.mutate()}
								className='bg-emerald-600 hover:bg-emerald-500 text-white'
							>
								{createMutation.isPending ? 'Criando...' : 'Criar Projeto'}
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			{/* Grid de Projetos */}
			{isLoading ? (
				<div className='flex h-48 items-center justify-center text-sm text-zinc-500'>
					Carregando seus projetos...
				</div>
			) : projects.length === 0 ? (
				<div className='flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 p-12 text-center'>
					<BookOpen className='h-10 w-10 text-zinc-600' />
					<h3 className='mt-3 font-semibold text-zinc-200'>
						Nenhum projeto encontrado
					</h3>
					<p className='mt-1 text-sm text-zinc-500'>
						Você ainda não possui projetos LaTeX criados. Comece criando seu
						primeiro paper!
					</p>
					<Button
						onClick={() => setIsCreateOpen(true)}
						className='mt-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs'
					>
						<Plus className='mr-1.5 h-3.5 w-3.5' />
						Criar Primeiro Projeto
					</Button>
				</div>
			) : (
				<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
					{projects.map((proj: any) => (
						<Card
							key={proj.id}
							className='group border-zinc-800 bg-zinc-900/50 transition hover:border-zinc-700 hover:bg-zinc-900'
						>
							<CardHeader className='pb-3'>
								<div className='flex items-start justify-between'>
									<div className='flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800 text-emerald-400'>
										<FileText className='h-5 w-5' />
									</div>
									<Button
										variant='ghost'
										size='sm'
										onClick={(e) => {
											e.stopPropagation()
											if (confirm('Deseja realmente excluir este projeto?')) {
												deleteMutation.mutate(proj.id)
											}
										}}
										className='h-8 w-8 p-0 text-zinc-500 hover:text-red-400'
									>
										<Trash2 className='h-4 w-4' />
									</Button>
								</div>
								<CardTitle className='mt-2 text-base font-semibold text-zinc-100 group-hover:text-emerald-400'>
									{proj.title}
								</CardTitle>
								<CardDescription className='line-clamp-2 text-xs text-zinc-400'>
									{proj.description || 'Sem descrição cadastrada'}
								</CardDescription>
							</CardHeader>
							<CardContent className='pb-3 text-xs text-zinc-500'>
								<div className='flex items-center space-x-4'>
									<span className='flex items-center'>
										<Clock className='mr-1 h-3.5 w-3.5 text-zinc-400' />
										{new Date(proj.updatedAt).toLocaleDateString('pt-BR')}
									</span>
									<span>{proj._count?.files || 0} arquivos</span>
								</div>
							</CardContent>
							<CardFooter className='pt-0'>
								<Button
									render={
										<Link
											to='/projects/$projectId'
											params={{ projectId: proj.id }}
										/>
									}
									className='w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium'
								>
									Abrir Workspace
									<ArrowRight className='ml-1.5 h-3.5 w-3.5' />
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			)}
		</div>
	)
}
