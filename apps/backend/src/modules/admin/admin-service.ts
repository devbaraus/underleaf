import { prisma } from '@/lib/db'
import type { UpdateQuotaInput, UpdateRoleInput, UpdateStatusInput } from './admin-schema'

export class AdminService {
  static async listUsers() {
    return prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { projects: true, compileLogs: true },
        },
      },
    })
  }

  static async updateUserQuota(targetUserId: string, input: UpdateQuotaInput) {
    return prisma.user.update({
      where: { id: targetUserId },
      data: { quotaMb: input.quotaMb },
    })
  }

  static async updateUserStatus(targetUserId: string, input: UpdateStatusInput) {
    return prisma.user.update({
      where: { id: targetUserId },
      data: { status: input.status },
    })
  }

  static async updateUserRole(targetUserId: string, input: UpdateRoleInput) {
    return prisma.user.update({
      where: { id: targetUserId },
      data: { role: input.role },
    })
  }

  static async listProjects() {
    return prisma.project.findMany({
      orderBy: { updatedAt: 'desc' },
      include: {
        owner: {
          select: { id: true, name: true, email: true },
        },
        _count: {
          select: { files: true, compileLogs: true },
        },
      },
    })
  }

  static async getTelemetry() {
    const memory = process.memoryUsage()
    const userCount = await prisma.user.count()
    const projectCount = await prisma.project.count()
    const compilationCount = await prisma.compileLog.count()
    const successfulCompilations = await prisma.compileLog.count({ where: { success: true } })

    return {
      uptimeSeconds: process.uptime(),
      memory: {
        rssMb: Math.round(memory.rss / (1024 * 1024)),
        heapTotalMb: Math.round(memory.heapTotal / (1024 * 1024)),
        heapUsedMb: Math.round(memory.heapUsed / (1024 * 1024)),
      },
      stats: {
        userCount,
        projectCount,
        compilationCount,
        successfulCompilations,
      },
    }
  }

  static async getAuditLogs() {
    return prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    })
  }
}
