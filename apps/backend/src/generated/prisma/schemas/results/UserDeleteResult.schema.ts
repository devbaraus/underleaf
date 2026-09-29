import * as z from 'zod';
export const UserDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  emailVerified: z.boolean(),
  image: z.string().nullable().optional(),
  role: z.string(),
  status: z.string(),
  banned: z.boolean().nullable().optional(),
  banReason: z.string().nullable().optional(),
  banExpires: z.date().nullable().optional(),
  quotaMb: z.number().int(),
  storageUsedMb: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  sessions: z.array(z.unknown()).optional(),
  accounts: z.array(z.unknown()).optional(),
  projects: z.array(z.unknown()).optional(),
  compileLogs: z.array(z.unknown()).optional(),
  auditLogs: z.array(z.unknown()).optional()
}));