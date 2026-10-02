export type ProviderFetch = (url: string, init: RequestInit) => Promise<Response>

export function integrationError(message: string, status = 502) {
  return Object.assign(new Error(message), { status })
}

export async function providerRequest(
  url: string,
  init: RequestInit = {},
  request: ProviderFetch = fetch,
) {
  try {
    const response = await request(url, {
      ...init,
      redirect: 'error',
      signal: AbortSignal.timeout(20_000),
    })
    if (!response.ok) {
      if (response.status === 401 || response.status === 403)
        throw integrationError(
          'Acesso recusado pelo provedor. Verifique a conexão ou as permissões da chave.',
          400,
        )
      if (response.status === 429 || response.status === 503)
        throw integrationError(
          'Provedor temporariamente indisponível. Tente novamente mais tarde.',
          503,
        )
      throw integrationError('Não foi possível consultar a biblioteca no provedor.')
    }
    return response
  } catch (error) {
    if (error instanceof Error && 'status' in error) throw error
    throw integrationError('Falha de comunicação com o provedor de referências.')
  }
}

export function nextPage(link: string | null, current: URL) {
  const match = link?.match(/<([^>]+)>;\s*rel="?next"?/)
  if (!match) return null
  const next = new URL(match[1]!, current)
  if (
    next.origin !== current.origin ||
    next.pathname !== current.pathname ||
    next.username ||
    next.password
  ) {
    throw integrationError('Paginação inválida recebida do provedor.')
  }
  return next
}

export async function exportBibliography(
  provider: 'zotero' | 'mendeley',
  credentials: {
    apiKey?: string
    libraryId?: string
    libraryType?: 'users' | 'groups'
    accessToken?: string
  },
  request: ProviderFetch = fetch,
) {
  let url: URL | null
  let headers: Record<string, string>
  if (provider === 'zotero') {
    if (!/^\d+$/.test(credentials.libraryId ?? ''))
      throw integrationError('ID da biblioteca Zotero inválido.', 400)
    url = new URL(
      `https://api.zotero.org/${credentials.libraryType === 'groups' ? 'groups' : 'users'}/${credentials.libraryId}/items/top?format=bibtex&limit=100`,
    )
    headers = { 'Zotero-API-Version': '3', 'Zotero-API-Key': credentials.apiKey ?? '' }
  } else {
    url = new URL('https://api.mendeley.com/documents?view=bib&limit=500')
    headers = { Authorization: `Bearer ${credentials.accessToken}`, Accept: 'application/x-bibtex' }
  }
  const visited = new Set<string>()
  const parts: string[] = []
  let bytes = 0
  while (url) {
    if (visited.has(url.href) || visited.size >= 100)
      throw integrationError('Biblioteca excedeu o limite de importação.', 413)
    visited.add(url.href)
    const response = await providerRequest(url.href, { headers }, request)
    // Bound streamed responses before allocating a complete library in memory.
    const reader = response.body?.getReader()
    const decoder = new TextDecoder()
    let text = ''
    if (reader) {
      try {
        while (true) {
          const chunk = await reader.read()
          if (chunk.done) break
          bytes += chunk.value.byteLength
          if (bytes > 5 * 1024 * 1024)
            throw integrationError('Biblioteca excedeu o limite de 5 MB.', 413)
          text += decoder.decode(chunk.value, { stream: true })
        }
        text += decoder.decode()
      } finally {
        await reader.cancel()
      }
    }
    parts.push(text)
    const next = nextPage(response.headers.get('link'), url)
    if (next && Number(response.headers.get('backoff')) > 0)
      throw integrationError(
        'Zotero solicitou uma pausa. Tente importar novamente mais tarde.',
        503,
      )
    url = next
  }
  const content = parts.join('\n\n').trim()
  if (!/@[a-z]+\s*[{(]/i.test(content))
    throw integrationError('A biblioteca não contém referências exportáveis.', 400)
  return content + '\n'
}
