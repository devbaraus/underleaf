import { Elysia } from 'elysia'
import { BetterAuthMacro } from '@/macros/better-auth-macro'
import { prisma } from '@/lib/db'

export const UserController = new Elysia({ name: 'user-controller', tags: ['User'] })
  .use(BetterAuthMacro)
  .get(
    '/api/user/me',
    async ({ user }) => {
      const stats = await prisma.project.aggregate({
        where: { ownerId: user.id },
        _count: { id: true },
        _sum: { storageBytes: true },
      })

      const storageUsedMb = Number(((stats._sum.storageBytes || 0) / (1024 * 1024)).toFixed(2))

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        quotaMb: user.quotaMb,
        storageUsedMb,
        projectCount: stats._count.id,
      }
    },
    { auth: true },
  )
