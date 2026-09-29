import * as z from 'zod';
import type { Prisma } from '../../browser';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutCompileLogsNestedInputObjectSchema as UserUpdateOneRequiredWithoutCompileLogsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutCompileLogsNestedInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  success: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  durationMs: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  errors: z.union([JsonNullValueInputSchema, jsonSchema]).optional(),
  rawOutput: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  engine: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCompileLogsNestedInputObjectSchema).optional()
}).strict();
export const CompileLogUpdateWithoutProjectInputObjectSchema: z.ZodType<Prisma.CompileLogUpdateWithoutProjectInput> = makeSchema() as unknown as z.ZodType<Prisma.CompileLogUpdateWithoutProjectInput>;
export const CompileLogUpdateWithoutProjectInputObjectZodSchema = makeSchema();
