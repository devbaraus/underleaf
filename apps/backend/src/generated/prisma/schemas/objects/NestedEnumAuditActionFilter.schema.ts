import * as z from 'zod';
import type { Prisma } from '../../browser';
import { AuditActionSchema } from '../enums/AuditAction.schema'

const nestedenumauditactionfilterSchema = z.object({
  equals: AuditActionSchema.optional(),
  in: AuditActionSchema.array().optional(),
  notIn: AuditActionSchema.array().optional(),
  not: z.union([AuditActionSchema, z.lazy(() => NestedEnumAuditActionFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumAuditActionFilterObjectSchema: z.ZodType<Prisma.NestedEnumAuditActionFilter> = nestedenumauditactionfilterSchema as unknown as z.ZodType<Prisma.NestedEnumAuditActionFilter>;
export const NestedEnumAuditActionFilterObjectZodSchema = nestedenumauditactionfilterSchema;
