import * as z from 'zod';
import type { Prisma } from '../../browser';
import { AuditActionSchema } from '../enums/AuditAction.schema';
import { NestedEnumAuditActionFilterObjectSchema as NestedEnumAuditActionFilterObjectSchema } from './NestedEnumAuditActionFilter.schema'

const makeSchema = () => z.object({
  equals: AuditActionSchema.optional(),
  in: AuditActionSchema.array().optional(),
  notIn: AuditActionSchema.array().optional(),
  not: z.union([AuditActionSchema, z.lazy(() => NestedEnumAuditActionFilterObjectSchema)]).optional()
}).strict();
export const EnumAuditActionFilterObjectSchema: z.ZodType<Prisma.EnumAuditActionFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumAuditActionFilter>;
export const EnumAuditActionFilterObjectZodSchema = makeSchema();
