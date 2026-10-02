import { describe, expect, test } from 'bun:test'
import { type ProviderFetch, exportBibliography, nextPage, providerRequest } from './reference-api'
import { seal, unseal } from './reference-secrets'

const secret = 'integration-test-secret'
describe('reference API imports', () => {
  test('imports all Zotero pages with header authentication', async () => {
    const calls: string[] = []
    const request = (async (url: string, init: RequestInit) => {
      calls.push(url)
      expect((init.headers as Record<string, string>)['Zotero-API-Key']).toBe('private-key')
      expect(url).not.toContain('private-key')
      return new Response(
        calls.length === 1 ? '@book{first, title={First}}' : '@article{second, title={Second}}',
        {
          headers:
            calls.length === 1
              ? { link: '<https://api.zotero.org/users/123/items/top?start=100>; rel="next"' }
              : {},
        },
      )
    }) as ProviderFetch
    const text = await exportBibliography(
      'zotero',
      { libraryId: '123', apiKey: 'private-key' },
      request,
    )
    expect(calls).toHaveLength(2)
    expect(text).toContain('@book{first')
    expect(text).toContain('@article{second')
  })
  test('Mendeley uses the native BibTeX export and bearer token', async () => {
    const request = (async (url: string, init: RequestInit) => {
      expect(url).toContain('view=bib')
      expect((init.headers as Record<string, string>).Accept).toBe('application/x-bibtex')
      expect((init.headers as Record<string, string>).Authorization).toBe('Bearer token')
      return new Response('@book{key, title={Book}}')
    }) as ProviderFetch
    expect(await exportBibliography('mendeley', { accessToken: 'token' }, request)).toContain(
      '@book{key',
    )
  })
  test('rejects credential-leaking pagination URLs', () => {
    const url = new URL('https://api.mendeley.com/documents')
    for (const next of [
      'https://evil.example/documents',
      'http://api.mendeley.com/documents',
      'https://api.mendeley.com/oauth/token',
    ]) {
      expect(() => nextPage(`<${next}>; rel="next"`, url)).toThrow('Paginação inválida')
    }
  })
  test('rejects loops, empty libraries, excessive payloads and invalid IDs', async () => {
    await expect(exportBibliography('zotero', { libraryId: '../keys' })).rejects.toThrow('ID')
    await expect(
      exportBibliography('mendeley', {}, (async () => new Response('')) as ProviderFetch),
    ).rejects.toThrow('não contém')
    await expect(
      exportBibliography(
        'mendeley',
        {},
        (async () => new Response('x'.repeat(5 * 1024 * 1024 + 1))) as ProviderFetch,
      ),
    ).rejects.toThrow('5 MB')
    await expect(
      exportBibliography(
        'mendeley',
        {},
        (async () =>
          new Response('@book{k}', {
            headers: {
              link: '<https://api.mendeley.com/documents?view=bib&limit=500>; rel="next"',
            },
          })) as ProviderFetch,
      ),
    ).rejects.toThrow('limite')
  })
  test('sanitizes provider errors and rejects redirects', async () => {
    await expect(
      providerRequest(
        'https://api.mendeley.com/documents',
        {},
        (async () => new Response('secret token', { status: 403 })) as ProviderFetch,
      ),
    ).rejects.toThrow('Acesso recusado')
    await expect(
      providerRequest('https://api.mendeley.com/documents', {}, (async (
        _url: string,
        init: RequestInit,
      ) => {
        expect(init.redirect).toBe('error')
        throw new Error('secret token')
      }) as ProviderFetch),
    ).rejects.toThrow('Falha de comunicação')
  })
  test('credentials and OAuth state are encrypted, user-bound and expire', () => {
    const value = seal(
      { userId: 'user', expires: Date.now() + 10000, accessToken: 'private-token' },
      secret,
    )
    expect(value).not.toContain('private-token')
    expect(unseal(value, 'user', secret)).toBeTruthy()
    expect(unseal(value, 'other', secret)).toBeNull()
    expect(unseal(value, 'user', 'wrong-secret')).toBeNull()
    expect(unseal(value.slice(0, -8) + 'modified', 'user', secret)).toBeNull()
    expect(unseal(seal({ userId: 'user', expires: 0 }, secret), 'user', secret)).toBeNull()
  })
})
