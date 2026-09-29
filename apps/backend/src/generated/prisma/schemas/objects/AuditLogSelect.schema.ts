import * as z from 'zod';
import type { Prisma } from '../../browser';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  model: z.boolean().optional(),
  action: z.boolean().optional(),
  recordId: z.boolean().optional(),
  userId: z.boolean().optional(),
  after: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
}).strict();
export const AuditLogSelectObjectSchema: z.ZodType<Prisma.AuditLogSelect> = makeSchema() as unknown as z.ZodType<Prisma.AuditLogSelect>;
export const AuditLogSelectObjectZodSchema = makeSchema();
