import { Elysia, t } from 'elysia'
import { BetterAuthMacro } from '@/macros/better-auth-macro'
import { compileBodySchema } from './compiler-schema'
import { assertProjectAccess } from '../projects/project-access'
import { CompilerService } from './compiler-service'
import { logging } from '@/shared/logger'

export const CompilerController = new Elysia({ name: 'compiler-controller', tags: ['Compiler'] })
  .use(BetterAuthMacro)
  .post(
    '/api/projects/:id/compile',
    async ({ params: { id }, body, user, set, request }) => {
      const isSSE = request.headers.get('accept')?.includes('text/event-stream')

      if (isSSE) {
        set.headers['content-type'] = 'text/event-stream'
        set.headers['cache-control'] = 'no-cache'
        set.headers['connection'] = 'keep-alive'

        const encoder = new TextEncoder()
        const stream = new ReadableStream({
          async start(controller) {
            const sendSSE = (type: 'log' | 'result' | 'error', data: any) => {
              try {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type, data })}\n\n`))
              } catch {}
            }

            try {
              logging.info(`[compiler-controller] Iniciando stream SSE de compilação: projeto ${id} (usuário: ${user.id})`)
              const result = await CompilerService.compile(id, user.id, body, (line) => {
                sendSSE('log', line)
              })
              sendSSE('result', result)
            } catch (error: any) {
              logging.error(`[compiler-controller] Erro durante stream de compilação:`, error)
              sendSSE('error', error.message || 'Erro durante a compilação')
            } finally {
              try {
                controller.close()
              } catch {}
            }
          },
        })

        return stream
      }

      logging.info(`[compiler-controller] Recebida solicitação de compilação: projeto ${id} (usuário: ${user.id})`)
      const result = await CompilerService.compile(id, user.id, body)
      if (!result.success) {
        set.status = 422
      }
      logging.info(`[compiler-controller] Resposta de compilação enviada: projeto ${id} (status: ${set.status ?? 200}, sucesso: ${result.success})`)
      return result
    },
    {
      auth: true,
      body: compileBodySchema,
      params: t.Object({
        id: t.String(),
      }),
    },
  )
  .get(
    '/api/projects/:id/pdf',
    async ({ params: { id }, set, user }) => {
      await assertProjectAccess(id, user.id)
      const file = await CompilerService.getPdf(id)
      set.headers['Content-Type'] = 'application/pdf'
      set.headers['Content-Disposition'] = `inline; filename="${id}.pdf"`
      return file
    },
    {
      auth: true,
      params: t.Object({
        id: t.String(),
      }),
    },
  )
  .get(
    '/api/projects/:id/logs',
    async ({ params: { id }, user }) => {
      await assertProjectAccess(id, user.id)
      return CompilerService.getLogs(id)
    },
    {
      auth: true,
      params: t.Object({
        id: t.String(),
      }),
    },
  )
