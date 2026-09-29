import * as z from 'zod';
import type { Prisma } from '../../browser';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { ProjectCreateNestedOneWithoutCompileLogsInputObjectSchema as ProjectCreateNestedOneWithoutCompileLogsInputObjectSchema } from './ProjectCreateNestedOneWithoutCompileLogsInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  success: z.boolean(),
  durationMs: z.number().int(),
  errors: z.union([JsonNullValueInputSchema, jsonSchema]).optional(),
  rawOutput: z.string().optional(),
  engine: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  project: z.lazy(() => ProjectCreateNestedOneWithoutCompileLogsInputObjectSchema)
}).strict();
export const CompileLogCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.CompileLogCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CompileLogCreateWithoutUserInput>;
export const CompileLogCreateWithoutUserInputObjectZodSchema = makeSchema();
