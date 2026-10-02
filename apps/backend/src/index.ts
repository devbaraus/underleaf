import cors from '@elysia/cors'
import { openapi } from '@elysia/openapi'
import { Elysia } from 'elysia'
import logixlysia from 'logixlysia'
import { zodToJsonSchema } from 'zod-to-json-schema'

import { authOpenAPI } from './lib/auth'
import { prisma } from './lib/db'
import { env } from './lib/env'
import './lib/zod'

import { BetterAuthMacro } from './macros/better-auth-macro'
import { ErrorMacro } from './macros/error-macro'
import { AdminController } from './modules/admin/admin-controller'
import { CompilerController } from './modules/compiler/compiler-controller'
import { ProjectsController } from './modules/projects/projects-controller'
import { CollaborationController } from './modules/collaboration/collaboration-controller'
import { UserController } from './modules/user/user-controller'
import { logging } from './shared/logger'

const authDocs = await authOpenAPI()

export const app = new Elysia()
  .use(
    cors({
      origin: env.CORS_ORIGIN,
      methods: env.CORS_METHODS as any,
      credentials: true,
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Correlation-Id',
        'authorization',
      ],
      exposeHeaders: ['set-auth-token'],
    }),
  )
  .use(
    logixlysia({
      config: {
        showStartupMessage: true,
        startupMessageFormat: 'simple',
        requestId: {
          header: 'X-Correlation-Id',
          generator: () => `req-${crypto.randomUUID()}`,
        },
      },
    }),
  )
  .use(
    openapi({
      path: '/openapi',
      documentation: {
        info: {
          title: 'Underleaf API',
          version: '1.0.0',
          description: 'Documentação da API REST da plataforma Underleaf LaTeX',
        },
        tags: [
          { name: 'Auth', description: 'Autenticação, sessões e tokens via Better Auth' },
          { name: 'Projects', description: 'Gerenciamento de projetos e arquivos LaTeX' },
          { name: 'Compiler', description: 'Compilação sob demanda com Tectonic Engine e stream de PDF' },
          { name: 'Admin', description: 'Governança, controle de cotas e telemetria' },
          { name: 'User', description: 'Perfil e consumo de cota do usuário' },
        ],
        components: authDocs.components,
        paths: authDocs.paths,
      },
      mapJsonSchema: {
        zod: zodToJsonSchema,
      },
    }),
  )
  .get('/healthz', async ({ set }) => {
    const database = await prisma.$queryRaw`SELECT 1`.then(() => true).catch(() => false)
    if (!database) {
      set.status = 503
      return { ok: false, database: false }
    }
    return { ok: true, database: true, timestamp: new Date().toISOString() }
  })
  .use(ErrorMacro)
  .use(BetterAuthMacro)
  .use(UserController)
  .use(ProjectsController)
  .use(CompilerController)
  .use(CollaborationController)
  .use(AdminController)
  .ws('/ws', {
    auth: true,
    open(ws) {
      ws.subscribe(`user:${ws.data.user.id}`)
    },
    close(ws) {
      ws.unsubscribe(`user:${ws.data.user.id}`)
    },
  })
  .listen(env.PORT)

logging.info(`🚀 Underleaf API rodando em http://${app.server?.hostname}:${app.server?.port}`)
logging.info(`📖 OpenAPI Docs disponível em http://${app.server?.hostname}:${app.server?.port}/openapi`)
