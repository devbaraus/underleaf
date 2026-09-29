import * as z from 'zod';
import type { Prisma } from '../../browser';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  model: z.literal(true).optional(),
  action: z.literal(true).optional(),
  recordId: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  createdAt: z.literal(true).optional()
}).strict();
export const AuditLogMinAggregateInputObjectSchema: z.ZodType<Prisma.AuditLogMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AuditLogMinAggregateInputType>;
export const AuditLogMinAggregateInputObjectZodSchema = makeSchema();
