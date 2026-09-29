import { Elysia, t } from 'elysia'
import { BetterAuthMacro } from '@/macros/better-auth-macro'
import { DbTransactionMacro } from '@/macros/transaction-macro'
import {
  createFileSchema,
  createProjectSchema,
  updateFileSchema,
  updateProjectSchema,
} from './projects-schema'
import { ProjectsService } from './projects-service'

export const ProjectsController = new Elysia({ name: 'projects-controller', tags: ['Projects'] })
  .use(BetterAuthMacro)
  .use(DbTransactionMacro)
  .get(
    '/api/projects',
    async ({ user }) => {
      return ProjectsService.list(user.id)
    },
    { auth: true },
  )
  .post(
    '/api/projects',
    async ({ user, body }) => {
      return ProjectsService.create(user.id, body)
    },
    {
      auth: true,
      body: createProjectSchema,
    },
  )
  .get(
    '/api/projects/:id',
    async ({ user, params: { id } }) => {
      return ProjectsService.getById(id, user.id)
    },
    {
      auth: true,
      params: t.Object({ id: t.String() }),
    },
  )
  .patch(
    '/api/projects/:id',
    async ({ user, params: { id }, body }) => {
      return ProjectsService.update(id, user.id, body)
    },
    {
      auth: true,
      params: t.Object({ id: t.String() }),
      body: updateProjectSchema,
    },
  )
  .delete(
    '/api/projects/:id',
    async ({ user, params: { id } }) => {
      await ProjectsService.delete(id, user.id)
      return { success: true }
    },
    {
      auth: true,
      params: t.Object({ id: t.String() }),
    },
  )
  .post(
    '/api/projects/:id/files',
    async ({ user, params: { id }, body }) => {
      return ProjectsService.createFile(id, user.id, body)
    },
    {
      auth: true,
      params: t.Object({ id: t.String() }),
      body: createFileSchema,
    },
  )
  .put(
    '/api/projects/:id/files/:fileId',
    async ({ user, params: { id, fileId }, body }) => {
      return ProjectsService.updateFile(id, fileId, user.id, body)
    },
    {
      auth: true,
      params: t.Object({ id: t.String(), fileId: t.String() }),
      body: updateFileSchema,
    },
  )
  .delete(
    '/api/projects/:id/files/:fileId',
    async ({ user, params: { id, fileId } }) => {
      await ProjectsService.deleteFile(id, fileId, user.id)
      return { success: true }
    },
    {
      auth: true,
      params: t.Object({ id: t.String(), fileId: t.String() }),
    },
  )
