import { Elysia, t } from 'elysia'
import { BetterAuthMacro } from '@/macros/better-auth-macro'
import { compileBodySchema } from './compiler-schema'
import { CompilerService } from './compiler-service'

export const CompilerController = new Elysia({ name: 'compiler-controller', tags: ['Compiler'] })
  .use(BetterAuthMacro)
  .post(
    '/api/projects/:id/compile',
    async ({ params: { id }, body, user, set }) => {
      const result = await CompilerService.compile(id, user.id, body)
      if (!result.success) {
        set.status = 422
      }
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
    async ({ params: { id }, set }) => {
      const file = await CompilerService.getPdf(id)
      set.headers['Content-Type'] = 'application/pdf'
      set.headers['Content-Disposition'] = `inline; filename="${id}.pdf"`
      return file
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    },
  )
  .get(
    '/api/projects/:id/logs',
    async ({ params: { id } }) => {
      return CompilerService.getLogs(id)
    },
    {
      auth: true,
      params: t.Object({
        id: t.String(),
      }),
    },
  )
