import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'
import { appConfig } from '#/config'
import { Button } from '#/components/ui/button'

type Collaborator = { userId: string; role: string; user: { name: string; email: string } }

export function ProjectSharing({ projectId }: { projectId: string }) {
	const [email, setEmail] = useState('')
	const [role, setRole] = useState<'editor' | 'viewer'>('editor')
	const queryClient = useQueryClient()
	const url = `${appConfig.apiUrl}/api/projects/${projectId}/collaborators`
	const { data: collaborators = [] } = useQuery<Collaborator[]>({
		queryKey: ['collaborators', projectId],
		queryFn: async () => {
			const res = await fetch(url, { credentials: 'include' })
			if (!res.ok) throw new Error('Falha ao carregar colaboradores')
			return res.json()
		},
	})
	const mutation = useMutation({
		mutationFn: async (userId?: string) => {
			const res = await fetch(userId ? `${url}/${userId}` : url, {
				method: userId ? 'DELETE' : 'PUT',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: userId ? undefined : JSON.stringify({ email, role }),
			})
			if (!res.ok) throw new Error((await res.json()).message || 'Falha ao atualizar acesso')
		},
		onSuccess: () => {
			setEmail('')
			queryClient.invalidateQueries({ queryKey: ['collaborators', projectId] })
		},
		onError: (error: Error) => toast.error(error.message),
	})
	return (
		<details className="relative text-xs">
			<summary className="cursor-pointer rounded border border-zinc-700 px-2 py-1">
				Compartilhar
			</summary>
			<div className="absolute right-0 top-9 z-50 w-80 space-y-3 rounded border border-zinc-700 bg-zinc-900 p-4 shadow-xl">
				<p>Compartilhe com um usuário cadastrado. Use o mesmo e-mail para alterar a permissão.</p>
				<form
					className="space-y-2"
					onSubmit={(event) => {
						event.preventDefault()
						mutation.mutate(undefined)
					}}
				>
					<input
						aria-label="E-mail do colaborador"
						type="email"
						required
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						placeholder="E-mail do colaborador"
						className="w-full rounded border border-zinc-700 bg-zinc-800 p-2"
					/>
					<select
						aria-label="Permissão"
						value={role}
						onChange={(event) => setRole(event.target.value as 'editor' | 'viewer')}
						className="w-full rounded bg-zinc-800 p-2"
					>
						<option value="editor">Pode editar</option>
						<option value="viewer">Pode visualizar</option>
					</select>
					<Button type="submit" size="sm" disabled={mutation.isPending}>
						Adicionar / atualizar
					</Button>
				</form>
				{collaborators.map((collaborator) => (
					<div key={collaborator.userId} className="flex items-center justify-between gap-2">
						<span className="min-w-0 break-all">
							{collaborator.user.email} · {collaborator.role === 'viewer' ? 'Leitor' : 'Editor'}
						</span>
						<button
							type="button"
							disabled={mutation.isPending}
							onClick={() => mutation.mutate(collaborator.userId)}
							className="text-red-400"
						>
							Remover
						</button>
					</div>
				))}
			</div>
		</details>
	)
}
