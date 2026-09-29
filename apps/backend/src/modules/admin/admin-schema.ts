import { z } from 'zod'

export const updateQuotaSchema = z.object({
  quotaMb: z.number().int().min(50).max(100000),
})

export const updateStatusSchema = z.object({
  status: z.enum(['active', 'suspended']),
})

export const updateRoleSchema = z.object({
  role: z.enum(['admin', 'editor', 'viewer']),
})

export type UpdateQuotaInput = z.infer<typeof updateQuotaSchema>
export type UpdateStatusInput = z.infer<typeof updateStatusSchema>
export type UpdateRoleInput = z.infer<typeof updateRoleSchema>
