import * as z from 'zod';
import type { Prisma } from '../../browser';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumAuditActionFilterObjectSchema as EnumAuditActionFilterObjectSchema } from './EnumAuditActionFilter.schema';
import { AuditActionSchema } from '../enums/AuditAction.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const auditlogscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => AuditLogScalarWhereInputObjectSchema), z.lazy(() => AuditLogScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AuditLogScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AuditLogScalarWhereInputObjectSchema), z.lazy(() => AuditLogScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  model: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  action: z.union([z.lazy(() => EnumAuditActionFilterObjectSchema), AuditActionSchema]).optional(),
  recordId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  userId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  after: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const AuditLogScalarWhereInputObjectSchema: z.ZodType<Prisma.AuditLogScalarWhereInput> = auditlogscalarwhereinputSchema as unknown as z.ZodType<Prisma.AuditLogScalarWhereInput>;
export const AuditLogScalarWhereInputObjectZodSchema = auditlogscalarwhereinputSchema;
