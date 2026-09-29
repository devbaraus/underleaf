import * as z from 'zod';
import type { Prisma } from '../../browser';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { AuditActionSchema } from '../enums/AuditAction.schema';
import { EnumAuditActionFieldUpdateOperationsInputObjectSchema as EnumAuditActionFieldUpdateOperationsInputObjectSchema } from './EnumAuditActionFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  model: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  action: z.union([AuditActionSchema, z.lazy(() => EnumAuditActionFieldUpdateOperationsInputObjectSchema)]).optional(),
  recordId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  after: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const AuditLogUpdateManyMutationInputObjectSchema: z.ZodType<Prisma.AuditLogUpdateManyMutationInput> = makeSchema() as unknown as z.ZodType<Prisma.AuditLogUpdateManyMutationInput>;
export const AuditLogUpdateManyMutationInputObjectZodSchema = makeSchema();
