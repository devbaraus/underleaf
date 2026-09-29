import * as z from 'zod';
import type { Prisma } from '../../browser';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  projectId: z.string(),
  userId: z.string(),
  success: z.boolean(),
  durationMs: z.number().int(),
  errors: z.union([JsonNullValueInputSchema, jsonSchema]).optional(),
  rawOutput: z.string().optional(),
  engine: z.string().optional(),
  createdAt: z.coerce.date().optional()
}).strict();
export const CompileLogUncheckedCreateInputObjectSchema: z.ZodType<Prisma.CompileLogUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CompileLogUncheckedCreateInput>;
export const CompileLogUncheckedCreateInputObjectZodSchema = makeSchema();
