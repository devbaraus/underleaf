import { Elysia, t } from 'elysia'
import { BetterAuthMacro } from '@/macros/better-auth-macro'
import { UserForbiddenError } from '@/modules/user/user-error'
import {
  updateQuotaSchema,
  updateRoleSchema,
  updateStatusSchema,
} from './admin-schema'
import { AdminService } from './admin-service'

function requireAdmin(user: any) {
  if (user.role !== 'admin') {
    throw new UserForbiddenError('Acesso restrito a administradores')
  }
}

export const AdminController = new Elysia({ name: 'admin-controller', tags: ['Admin'] })
  .use(BetterAuthMacro)
  .get(
    '/api/admin/users',
    async ({ user }) => {
      requireAdmin(user)
      return AdminService.listUsers()
    },
    { auth: true },
  )
  .patch(
    '/api/admin/users/:id/quota',
    async ({ user, params: { id }, body }) => {
      requireAdmin(user)
      return AdminService.updateUserQuota(id, body)
    },
    {
      auth: true,
      params: t.Object({ id: t.String() }),
      body: updateQuotaSchema,
    },
  )
  .patch(
    '/api/admin/users/:id/status',
    async ({ user, params: { id }, body }) => {
      requireAdmin(user)
      return AdminService.updateUserStatus(id, body)
    },
    {
      auth: true,
      params: t.Object({ id: t.String() }),
      body: updateStatusSchema,
    },
  )
  .patch(
    '/api/admin/users/:id/role',
    async ({ user, params: { id }, body }) => {
      requireAdmin(user)
      return AdminService.updateUserRole(id, body)
    },
    {
      auth: true,
      params: t.Object({ id: t.String() }),
      body: updateRoleSchema,
    },
  )
  .get(
    '/api/admin/projects',
    async ({ user }) => {
      requireAdmin(user)
      return AdminService.listProjects()
    },
    { auth: true },
  )
  .get(
    '/api/admin/telemetry',
    async ({ user }) => {
      requireAdmin(user)
      return AdminService.getTelemetry()
    },
    { auth: true },
  )
  .get(
    '/api/admin/audit',
    async ({ user }) => {
      requireAdmin(user)
      return AdminService.getAuditLogs()
    },
    { auth: true },
  )
