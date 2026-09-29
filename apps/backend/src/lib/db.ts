import { AsyncLocalStorage } from 'node:async_hooks'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@/generated/prisma/client'
import type { AuditAction } from '@/generated/prisma/enums'
import { env } from './env'

const store = new AsyncLocalStorage<{ userId?: string }>()

export const setAuditUser = (userId: string) => store.enterWith({ userId })
export const getAuditUserId = () => store.getStore()?.userId

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL })

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const AUDIT_SKIP = new Set([
  'AuditLog',
  'Session',
  'Account',
  'Verification',
])

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// AUDIT LOGGING EXTENSION
function writeAudit(model: string, action: AuditAction, recordId?: string | null, after?: unknown) {
  if (AUDIT_SKIP.has(model)) return

  const userId = getAuditUserId()

  prisma.auditLog
    .create({
      data: {
        model,
        action,
        recordId: recordId ?? undefined,
        after: (after as any) ?? undefined,
        userId: userId ?? undefined,
      },
    })
    .catch((err) => {
      console.error('[audit] failed to write log:', err)
    })
}

prisma.$extends({
  query: {
    $allModels: {
      async create({ model, args, query }) {
        const result = await query(args)
        writeAudit(model, 'CREATE', (result as any)?.id, args.data)
        return result
      },
      async update({ model, args, query }) {
        const result = await query(args)
        writeAudit(model, 'UPDATE', (result as any)?.id, args.data)
        return result
      },
      async delete({ model, args, query }) {
        const result = await query(args)
        writeAudit(model, 'DELETE', (result as any)?.id)
        return result
      },
      async upsert({ model, args, query }) {
        const result = await query(args)
        writeAudit(model, 'UPSERT', (result as any)?.id, {
          create: args.create,
          update: args.update,
        })
        return result
      },
    },
  },
})
