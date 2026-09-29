import * as z from 'zod';
import type { Prisma } from '../../browser';
import { AuditActionSchema } from '../enums/AuditAction.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  model: z.string(),
  action: AuditActionSchema,
  recordId: z.string().optional().nullable(),
  userId: z.string().optional().nullable(),
  after: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional()
}).strict();
export const AuditLogCreateManyInputObjectSchema: z.ZodType<Prisma.AuditLogCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.AuditLogCreateManyInput>;
export const AuditLogCreateManyInputObjectZodSchema = makeSchema();
