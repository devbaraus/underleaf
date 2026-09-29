import { Elysia } from 'elysia'
import { auth } from '@/lib/auth'
import { prisma, setAuditUser } from '@/lib/db'
import { UserNotAuthenticatedError, UserSuspendedError } from '@/modules/user/user-error'

export const BetterAuthMacro = new Elysia({ name: 'better-auth' }).mount(auth.handler).macro({
  auth: {
    async resolve({ request: { headers } }) {
      const session = await auth.api.getSession({
        headers,
      })

      if (!session) {
        throw new UserNotAuthenticatedError()
      }

      const user = await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
      })

      if (!user) {
        throw new UserNotAuthenticatedError()
      }

      if (user.status === 'suspended') {
        throw new UserSuspendedError()
      }

      setAuditUser(session.user.id)

      return {
        user,
        session: session.session,
      }
    },
  },
})
