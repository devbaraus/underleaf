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
  after: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional()
}).strict();
export const AuditLogUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.AuditLogUncheckedCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AuditLogUncheckedCreateWithoutUserInput>;
export const AuditLogUncheckedCreateWithoutUserInputObjectZodSchema = makeSchema();
