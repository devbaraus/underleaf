import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { appConfig } from '#/config'
import { Button } from '#/components/ui/button'

async function api(path: string, method = 'GET', body?: object) {
	const response = await fetch(`${appConfig.apiUrl}/api/references${path}`, {
		method,
		credentials: 'include',
		headers: body ? { 'Content-Type': 'application/json' } : undefined,
		body: body ? JSON.stringify(body) : undefined,
	})
	const data = await response.json()
	if (!response.ok) throw new Error(data.message || 'Falha na integração de referências')
	return data
}

export function ReferenceImport({ projectId }: { projectId: string }) {
	const [provider, setProvider] = useState<'zotero' | 'mendeley'>('zotero')
	const [apiKey, setApiKey] = useState('')
	const [libraryId, setLibraryId] = useState('')
	const [libraryType, setLibraryType] = useState('users')
	const [open, setOpen] = useState(false)
	const client = useQueryClient()
	const status = useQuery<{ configured: boolean; connected: boolean }>({
		queryKey: ['mendeley-status'],
		queryFn: () => api('/mendeley/status'),
		enabled: open,
	})
	useEffect(() => {
		const url = new URL(window.location.href)
		const result = url.searchParams.get('mendeley')
		if (!result) return
		if (result === 'connected') {
			toast.success('Mendeley conectado. Importe sua biblioteca em Referências.')
			setProvider('mendeley')
			setOpen(true)
			client.invalidateQueries({ queryKey: ['mendeley-status'] })
		} else toast.error('Não foi possível conectar ao Mendeley. Tente novamente.')
		url.searchParams.delete('mendeley')
		window.history.replaceState(window.history.state, '', url)
	}, [client])
	const mutation = useMutation({
		mutationFn: async (action: 'import' | 'connect' | 'disconnect') => {
			if (action === 'connect') {
				const data = await api('/mendeley/connect', 'POST', { projectId })
				window.location.assign(data.url)
				return null
			}
			if (action === 'disconnect') {
				await api('/mendeley', 'DELETE')
				return null
			}
			return api(
				`/${projectId}/${provider}/import`,
				'POST',
				provider === 'zotero' ? { apiKey, libraryId, libraryType } : undefined,
			)
		},
		onSuccess: (data) => {
			client.invalidateQueries({ queryKey: ['mendeley-status'] })
			if (!data) return
			setApiKey('')
			client.invalidateQueries({ queryKey: ['project', projectId] })
			toast.success(
				`Referências importadas em ${data.path}. Disponíveis no autocomplete de citações.`,
			)
		},
		onError: (error: Error) => toast.error(error.message),
	})
	const inputClass = 'w-full rounded border border-zinc-700 bg-zinc-800 p-2'
	return (
		<details
			className="relative text-xs"
			open={open}
			onToggle={(event) => setOpen(event.currentTarget.open)}
		>
			<summary className="cursor-pointer rounded border border-zinc-700 px-2 py-1">
				Referências
			</summary>
			<div className="absolute right-0 top-9 z-50 w-80 space-y-3 rounded border border-zinc-700 bg-zinc-900 p-4 shadow-xl">
				<label className="block">
					Importar biblioteca
					<select
						className={`${inputClass} mt-1`}
						value={provider}
						disabled={mutation.isPending}
						onChange={(event) => setProvider(event.target.value as typeof provider)}
					>
						<option value="zotero">Zotero</option>
						<option value="mendeley">Mendeley</option>
					</select>
				</label>
				<p>
					Cada importação cria um arquivo .bib. Inclua esse arquivo na bibliografia do seu documento
					para usá-lo no PDF.
				</p>
				{provider === 'zotero' ? (
					<form
						className="space-y-2"
						onSubmit={(event) => {
							event.preventDefault()
							mutation.mutate('import')
						}}
					>
						<label className="block">
							Biblioteca
							<select
								className={inputClass}
								value={libraryType}
								onChange={(event) => setLibraryType(event.target.value)}
							>
								<option value="users">Pessoal</option>
								<option value="groups">Grupo</option>
							</select>
						</label>
						<label className="block">
							ID numérico da biblioteca
							<input
								className={inputClass}
								required
								pattern="[0-9]+"
								value={libraryId}
								onChange={(event) => setLibraryId(event.target.value)}
							/>
						</label>
						<label className="block">
							Chave de API
							<input
								className={inputClass}
								type="password"
								autoComplete="off"
								required
								value={apiKey}
								onChange={(event) => setApiKey(event.target.value)}
							/>
						</label>
						<p>
							A chave é usada apenas nesta importação. Crie uma chave com acesso de leitura nas{' '}
							<a
								className="underline"
								href="https://www.zotero.org/settings/keys"
								target="_blank"
								rel="noreferrer"
							>
								configurações do Zotero
							</a>
							.
						</p>
						<Button type="submit" size="sm" disabled={mutation.isPending}>
							{mutation.isPending ? 'Importando…' : 'Importar Zotero'}
						</Button>
					</form>
				) : status.isPending ? (
					<p>Verificando conexão…</p>
				) : status.isError ? (
					<p role="alert">
						Falha ao verificar conexão.{' '}
						<button type="button" className="underline" onClick={() => status.refetch()}>
							Tentar novamente
						</button>
					</p>
				) : !status.data?.configured ? (
					<p>O administrador precisa configurar o aplicativo OAuth do Mendeley no servidor.</p>
				) : status.data.connected ? (
					<div className="flex gap-2">
						<Button
							size="sm"
							disabled={mutation.isPending}
							onClick={() => mutation.mutate('import')}
						>
							{mutation.isPending ? 'Aguarde…' : 'Importar Mendeley'}
						</Button>
						<Button
							size="sm"
							variant="outline"
							disabled={mutation.isPending}
							onClick={() => mutation.mutate('disconnect')}
						>
							Desconectar
						</Button>
					</div>
				) : (
					<div className="space-y-2">
						<p>Você será direcionado ao Mendeley para autorizar a leitura da sua biblioteca.</p>
						<Button
							size="sm"
							disabled={mutation.isPending}
							onClick={() => mutation.mutate('connect')}
						>
							Conectar Mendeley
						</Button>
					</div>
				)}
			</div>
		</details>
	)
}
