import * as z from 'zod';
import type { Prisma } from '../../browser';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { UserCreateNestedOneWithoutCompileLogsInputObjectSchema as UserCreateNestedOneWithoutCompileLogsInputObjectSchema } from './UserCreateNestedOneWithoutCompileLogsInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  success: z.boolean(),
  durationMs: z.number().int(),
  errors: z.union([JsonNullValueInputSchema, jsonSchema]).optional(),
  rawOutput: z.string().optional(),
  engine: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCompileLogsInputObjectSchema)
}).strict();
export const CompileLogCreateWithoutProjectInputObjectSchema: z.ZodType<Prisma.CompileLogCreateWithoutProjectInput> = makeSchema() as unknown as z.ZodType<Prisma.CompileLogCreateWithoutProjectInput>;
export const CompileLogCreateWithoutProjectInputObjectZodSchema = makeSchema();
