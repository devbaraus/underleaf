import * as z from 'zod';
import type { Prisma } from '../../browser';
import { AuditActionSchema } from '../enums/AuditAction.schema';
import { NestedEnumAuditActionWithAggregatesFilterObjectSchema as NestedEnumAuditActionWithAggregatesFilterObjectSchema } from './NestedEnumAuditActionWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumAuditActionFilterObjectSchema as NestedEnumAuditActionFilterObjectSchema } from './NestedEnumAuditActionFilter.schema'

const makeSchema = () => z.object({
  equals: AuditActionSchema.optional(),
  in: AuditActionSchema.array().optional(),
  notIn: AuditActionSchema.array().optional(),
  not: z.union([AuditActionSchema, z.lazy(() => NestedEnumAuditActionWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumAuditActionFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumAuditActionFilterObjectSchema).optional()
}).strict();
export const EnumAuditActionWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumAuditActionWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumAuditActionWithAggregatesFilter>;
export const EnumAuditActionWithAggregatesFilterObjectZodSchema = makeSchema();
