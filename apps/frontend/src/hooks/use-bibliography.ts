import { useEffect, useMemo, useState } from 'react'
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'
import { appConfig } from '#/config'
import { collectCitations, type BibliographyFile } from '#/lib/latex/bibliography'

export function useBibliography(projectId: string, files: BibliographyFile[]) {
	const [contents, setContents] = useState<Record<string, string>>({})
	const fileIds = JSON.stringify(
		files
			.filter((file) => file.type === 'bib' || file.path.toLowerCase().endsWith('.bib'))
			.map((file) => file.id)
			.sort(),
	)

	useEffect(() => {
		const ids: string[] = JSON.parse(fileIds)
		const url = new URL(appConfig.apiUrl, window.location.origin)
		url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:'
		url.pathname = `${url.pathname.replace(/\/$/, '')}/api/collaboration/${projectId}`
		const subscriptions = ids.map((id) => {
			const doc = new Y.Doc()
			const provider = new WebsocketProvider(url.toString().replace(/\/$/, ''), id, doc, {
				disableBc: true,
			})
			const publish = () => {
				if (!provider.synced) return
				setContents((previous) => ({ ...previous, [id]: doc.getText('content').toString() }))
			}
			provider.on('sync', publish)
			doc.on('update', publish)
			return { doc, provider, publish }
		})
		return () => {
			for (const { doc, provider, publish } of subscriptions) {
				doc.off('update', publish)
				provider.off('sync', publish)
				provider.destroy()
				doc.destroy()
			}
		}
	}, [projectId, fileIds])

	return useMemo(
		() =>
			collectCitations(
				files.map((file) => ({ ...file, content: contents[file.id] ?? file.content })),
			),
		[files, contents],
	)
}
