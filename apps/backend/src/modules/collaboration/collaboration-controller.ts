import { Elysia, t } from 'elysia'
import { env } from '@/lib/env'
import { BetterAuthMacro } from '@/macros/better-auth-macro'
import type { CollaborationRoom, Peer } from './collaboration-room'
import { CollaborationService } from './collaboration-service'

const connections = new Map<string, { room: CollaborationRoom; peer: Peer }>()

export const CollaborationController = new Elysia({ name: 'collaboration-controller' })
  .use(BetterAuthMacro)
  .ws('/api/collaboration/:projectId/:fileId', {
    auth: true,
    params: t.Object({ projectId: t.String(), fileId: t.String() }),
    maxPayloadLength: 1024 * 1024,
    async beforeHandle({ request, user, params, session }) {
      const origin = request.headers.get('origin')
      if (origin && !env.CORS_ORIGIN.includes(origin)) {
        throw Object.assign(new Error('Origem não permitida'), { status: 403 })
      }
      if (new Date(session.expiresAt).getTime() <= Date.now()) {
        throw Object.assign(new Error('Sessão expirada'), { status: 401 })
      }
      await CollaborationService.authorize(params.projectId, params.fileId, user.id)
      await CollaborationService.room(params.projectId, params.fileId)
    },
    async open(ws) {
      const { projectId, fileId } = ws.data.params
      const room = await CollaborationService.room(projectId, fileId)
      const peer: Peer = {
        userId: ws.data.user.id,
        send: (message) => {
          ws.raw.send(message)
        },
        close: (code, reason) => {
          ws.close(code, reason)
        },
      }
      connections.set(ws.id, { room, peer })
      room.join(peer)
    },
    async message(ws, message) {
      const connection = connections.get(ws.id)
      if (!connection) return
      if (!(message instanceof Uint8Array)) {
        ws.close(1003, 'Mensagem binária esperada')
        return
      }
      await connection.room
        .receive(connection.peer, message, async () => {
          // Membership, account state and session revocations take effect on every message.
          const { params, user, session } = ws.data
          const { prisma } = await import('@/lib/db')
          const current = await prisma.session.findUnique({ where: { id: session.id } })
          if (!current || current.expiresAt.getTime() <= Date.now())
            throw new Error('Sessão expirada')
          return CollaborationService.authorize(params.projectId, params.fileId, user.id)
        })
        .catch(() => {})
    },
    close(ws) {
      const connection = connections.get(ws.id)
      if (!connection) return
      connections.delete(ws.id)
      connection.room.leave(connection.peer)
      CollaborationService.release(ws.data.params.fileId, connection.room)
    },
  })
