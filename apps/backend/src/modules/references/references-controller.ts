import { Elysia, t } from 'elysia'
import { env } from '@/lib/env'
import { BetterAuthMacro } from '@/macros/better-auth-macro'
import { assertProjectAccess } from '../projects/project-access'
import { ProjectsService } from '../projects/projects-service'
import { exportBibliography, integrationError, providerRequest } from './reference-api'
import { seal, unseal } from './reference-secrets'

type Connection = {
  userId: string
  expires: number
  accessToken: string
  refreshToken: string
  tokenExpires: number
}
type State = { userId: string; expires: number; projectId: string; nonce: string }
const configured = () =>
  Boolean(env.MENDELEY_CLIENT_ID && env.MENDELEY_CLIENT_SECRET && env.MENDELEY_REDIRECT_URI)
function requireConfiguration() {
  if (!configured())
    throw integrationError(
      'Mendeley não configurado. Defina as credenciais OAuth no servidor.',
      503,
    )
}
function readCookie(request: Request, name: string) {
  return request.headers
    .get('cookie')
    ?.split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`))
    ?.slice(name.length + 1)
}
function cookie(name: string, value: string, seconds: number) {
  return `${name}=${value}; Path=/api/references; HttpOnly; SameSite=Lax; Max-Age=${seconds}${env.NODE_ENV === 'production' ? '; Secure' : ''}`
}
function connection(request: Request, userId: string) {
  return unseal<Connection>(
    readCookie(request, 'underleaf_mendeley'),
    userId,
    env.BETTER_AUTH_SECRET,
  )
}
function verifyOrigin(request: Request) {
  const origin = request.headers.get('origin')
  if (origin && !env.CORS_ORIGIN.includes(origin))
    throw integrationError('Origem não autorizada.', 403)
}
async function exchangeToken(
  parameters: Record<string, string>,
  userId: string,
): Promise<Connection> {
  requireConfiguration()
  const response = await providerRequest('https://api.mendeley.com/oauth/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${env.MENDELEY_CLIENT_ID}:${env.MENDELEY_CLIENT_SECRET}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ ...parameters, redirect_uri: env.MENDELEY_REDIRECT_URI! }),
  })
  const token = (await response.json()) as {
    access_token?: string
    refresh_token?: string
    expires_in?: number
  }
  if (!token.access_token || !token.refresh_token || !Number.isFinite(token.expires_in))
    throw integrationError('Resposta OAuth inválida do Mendeley.')
  return {
    userId,
    accessToken: token.access_token,
    refreshToken: token.refresh_token,
    tokenExpires: Date.now() + token.expires_in! * 1000,
    expires: Date.now() + 30 * 86400_000,
  }
}
async function saveImport(projectId: string, userId: string, provider: string, content: string) {
  const name = `${provider}-${Date.now()}-${crypto.randomUUID().slice(0, 8)}.bib`
  const file = await ProjectsService.createFile(projectId, userId, {
    name,
    path: name,
    content,
    type: 'bib',
    isMain: false,
  })
  return { fileId: file.id, path: file.path }
}

export const ReferencesController = new Elysia({
  name: 'references-controller',
  prefix: '/api/references',
  tags: ['References'],
})
  .use(BetterAuthMacro)
  .get(
    '/mendeley/status',
    ({ request, user, set }) => {
      set.headers['Cache-Control'] = 'no-store'
      return { configured: configured(), connected: Boolean(connection(request, user.id)) }
    },
    { auth: true },
  )
  .post(
    '/mendeley/connect',
    async ({ request, body, user, set }) => {
      verifyOrigin(request)
      requireConfiguration()
      await assertProjectAccess(body.projectId, user.id, 'write')
      const state: State = {
        userId: user.id,
        projectId: body.projectId,
        nonce: crypto.randomUUID(),
        expires: Date.now() + 600_000,
      }
      set.headers['set-cookie'] = cookie(
        'underleaf_mendeley_state',
        seal(state, env.BETTER_AUTH_SECRET),
        600,
      )
      set.headers['Cache-Control'] = 'no-store'
      const url = new URL('https://api.mendeley.com/oauth/authorize')
      url.search = new URLSearchParams({
        client_id: env.MENDELEY_CLIENT_ID!,
        redirect_uri: env.MENDELEY_REDIRECT_URI!,
        response_type: 'code',
        scope: 'all',
        state: state.nonce,
      }).toString()
      return { url: url.href }
    },
    { auth: true, body: t.Object({ projectId: t.String({ minLength: 1 }) }) },
  )
  .get(
    '/mendeley/callback',
    async ({ request, user, query, set, redirect }) => {
      set.headers['Cache-Control'] = 'no-store'
      set.headers['Referrer-Policy'] = 'no-referrer'
      set.headers['set-cookie'] = cookie('underleaf_mendeley_state', '', 0)
      const state = unseal<State>(
        readCookie(request, 'underleaf_mendeley_state'),
        user.id,
        env.BETTER_AUTH_SECRET,
      )
      if (!state || state.nonce !== query.state)
        throw integrationError('Autorização expirada ou inválida. Inicie a conexão novamente.', 400)
      const target = new URL(`/projects/${encodeURIComponent(state.projectId)}`, env.FRONTEND_URL)
      try {
        await assertProjectAccess(state.projectId, user.id, 'write')
        if (query.error || !query.code) throw integrationError('Autorização cancelada.', 400)
        const token = await exchangeToken(
          { grant_type: 'authorization_code', code: query.code },
          user.id,
        )
        set.headers['set-cookie'] = [
          cookie('underleaf_mendeley_state', '', 0),
          cookie('underleaf_mendeley', seal(token, env.BETTER_AUTH_SECRET), 30 * 86400),
        ]
        target.searchParams.set('mendeley', 'connected')
      } catch {
        target.searchParams.set('mendeley', 'error')
      }
      return redirect(target.href)
    },
    {
      auth: true,
      query: t.Object({
        state: t.Optional(t.String()),
        code: t.Optional(t.String()),
        error: t.Optional(t.String()),
        error_description: t.Optional(t.String()),
      }),
    },
  )
  .delete(
    '/mendeley',
    ({ request, set }) => {
      verifyOrigin(request)
      set.headers['set-cookie'] = cookie('underleaf_mendeley', '', 0)
      return { success: true }
    },
    { auth: true },
  )
  .post(
    '/:projectId/zotero/import',
    async ({ request, params, user, body }) => {
      verifyOrigin(request)
      await assertProjectAccess(params.projectId, user.id, 'write')
      const content = await exportBibliography('zotero', body)
      return saveImport(params.projectId, user.id, 'zotero', content)
    },
    {
      auth: true,
      body: t.Object({
        apiKey: t.String({ minLength: 1, maxLength: 256 }),
        libraryId: t.String({ pattern: '^\\d+$', maxLength: 32 }),
        libraryType: t.Union([t.Literal('users'), t.Literal('groups')]),
      }),
    },
  )
  .post(
    '/:projectId/mendeley/import',
    async ({ request, params, user, set }) => {
      verifyOrigin(request)
      await assertProjectAccess(params.projectId, user.id, 'write')
      let token = connection(request, user.id)
      if (!token) throw integrationError('Conecte sua conta Mendeley antes de importar.', 400)
      if (token.tokenExpires <= Date.now() + 60_000) {
        token = await exchangeToken(
          { grant_type: 'refresh_token', refresh_token: token.refreshToken },
          user.id,
        )
        set.headers['set-cookie'] = cookie(
          'underleaf_mendeley',
          seal(token, env.BETTER_AUTH_SECRET),
          30 * 86400,
        )
      }
      const content = await exportBibliography('mendeley', { accessToken: token.accessToken })
      return saveImport(params.projectId, user.id, 'mendeley', content)
    },
    { auth: true },
  )
