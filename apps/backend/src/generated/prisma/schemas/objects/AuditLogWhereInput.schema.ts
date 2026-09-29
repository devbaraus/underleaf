import * as z from 'zod';
import type { Prisma } from '../../browser';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumAuditActionFilterObjectSchema as EnumAuditActionFilterObjectSchema } from './EnumAuditActionFilter.schema';
import { AuditActionSchema } from '../enums/AuditAction.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserNullableScalarRelationFilterObjectSchema as UserNullableScalarRelationFilterObjectSchema } from './UserNullableScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const auditlogwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => AuditLogWhereInputObjectSchema), z.lazy(() => AuditLogWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AuditLogWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AuditLogWhereInputObjectSchema), z.lazy(() => AuditLogWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  model: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  action: z.union([z.lazy(() => EnumAuditActionFilterObjectSchema), AuditActionSchema]).optional(),
  recordId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  userId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  after: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserNullableScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional()
}).strict();
export const AuditLogWhereInputObjectSchema: z.ZodType<Prisma.AuditLogWhereInput> = auditlogwhereinputSchema as unknown as z.ZodType<Prisma.AuditLogWhereInput>;
export const AuditLogWhereInputObjectZodSchema = auditlogwhereinputSchema;
