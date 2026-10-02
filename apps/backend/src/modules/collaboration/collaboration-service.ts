import * as Y from 'yjs'
import { prisma } from '@/lib/db'
import { assertProjectAccess } from '../projects/project-access'
import { ensureProjectFile, readProjectFile, writeProjectFile } from '../projects/project-storage'
import { CollaborationRoom } from './collaboration-room'

const rooms = new Map<string, Promise<CollaborationRoom>>()

export const CollaborationService = {
  async authorize(projectId: string, fileId: string, userId: string) {
    const access = await assertProjectAccess(projectId, userId)
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user || user.status !== 'active' || user.banned) {
      throw Object.assign(new Error('Usuário sem acesso'), { status: 403 })
    }
    const file = await prisma.projectFile.findFirst({ where: { id: fileId, projectId } })
    if (!file || file.type === 'image') {
      throw Object.assign(new Error('Arquivo não disponível para colaboração'), { status: 404 })
    }
    return access.canWrite
  },

  room(projectId: string, fileId: string) {
    let promise = rooms.get(fileId)
    if (!promise) {
      promise = (async () => {
        const file = await prisma.projectFile.findFirstOrThrow({ where: { id: fileId, projectId } })
        ensureProjectFile(projectId, file)
        const persist = async (state: Uint8Array, content: string) => {
          const sizeBytes = Buffer.byteLength(content, 'utf8')
          await prisma.$transaction(async (tx) => {
            const previous = await tx.projectFile.findUniqueOrThrow({ where: { id: fileId } })
            await tx.projectFile.update({
              where: { id: fileId },
              data: { yjsState: new Uint8Array(state), content: '', sizeBytes },
            })
            await tx.project.update({
              where: { id: projectId },
              data: { storageBytes: { increment: sizeBytes - previous.sizeBytes } },
            })
          })
          writeProjectFile(projectId, file.path, content, file.type)
        }
        const room = new CollaborationRoom(
          file.yjsState,
          readProjectFile(projectId, file.path, file.type),
          persist,
        )
        // Persist the initial CRDT identity once, including for an empty document.
        try {
          await persist(Y.encodeStateAsUpdate(room.doc), room.doc.getText('content').toString())
          return room
        } catch (error) {
          room.destroy()
          throw error
        }
      })()
      rooms.set(fileId, promise)
      promise.catch(() => {
        if (rooms.get(fileId) === promise) rooms.delete(fileId)
      })
    }
    return promise
  },

  async content(fileId: string) {
    const room = await rooms.get(fileId)
    if (!room) return undefined
    await room.flush()
    return room.doc.getText('content').toString()
  },

  async disconnectUser(projectId: string, userId: string) {
    const files = await prisma.projectFile.findMany({ where: { projectId }, select: { id: true } })
    for (const file of files) {
      const room = await rooms.get(file.id)
      if (!room) continue
      for (const peer of room.peers.keys()) {
        if (peer.userId === userId) {
          room.leave(peer)
          peer.close(1008, 'Permissão alterada')
        }
      }
    }
  },

  async flushProject(projectId: string) {
    const files = await prisma.projectFile.findMany({ where: { projectId }, select: { id: true } })
    for (const file of files) await (await rooms.get(file.id))?.flush()
  },

  release(fileId: string, room: CollaborationRoom) {
    const timer = setTimeout(async () => {
      await room.flush()
      if (room.peers.size || (await rooms.get(fileId)) !== room) return
      rooms.delete(fileId)
      room.destroy()
    }, 30_000)
    timer.unref()
  },

  async closeFile(fileId: string) {
    const room = await rooms.get(fileId)
    if (!room) return
    await room.flush()
    for (const peer of room.peers.keys()) peer.close(1008, 'Arquivo removido')
    rooms.delete(fileId)
    room.destroy()
  },
}
