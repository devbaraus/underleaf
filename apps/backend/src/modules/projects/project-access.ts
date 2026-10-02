import { prisma } from '@/lib/db'

export function projectAccessWhere(userId: string) {
  return { OR: [{ ownerId: userId }, { collaborators: { some: { userId } } }] }
}

export async function assertProjectAccess(
  projectId: string,
  userId: string,
  mode: 'read' | 'write' | 'owner' = 'read',
) {
  const project = await prisma.project.findFirst({
    where: { id: projectId, ...projectAccessWhere(userId) },
    include: { collaborators: { where: { userId } } },
  })
  if (!project) throw Object.assign(new Error('Projeto não encontrado'), { status: 404 })
  const role = project.ownerId === userId ? 'owner' : project.collaborators[0]?.role
  const canWrite = role === 'owner' || role === 'editor' || role === 'collaborator'
  if ((mode === 'write' && !canWrite) || (mode === 'owner' && role !== 'owner')) {
    throw Object.assign(new Error('Sem permissão para alterar este projeto'), { status: 403 })
  }
  return { project, role, canWrite }
}
