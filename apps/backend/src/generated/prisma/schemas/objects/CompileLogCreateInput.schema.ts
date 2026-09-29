import * as z from 'zod';
import type { Prisma } from '../../browser';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { ProjectCreateNestedOneWithoutCompileLogsInputObjectSchema as ProjectCreateNestedOneWithoutCompileLogsInputObjectSchema } from './ProjectCreateNestedOneWithoutCompileLogsInput.schema';
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
  project: z.lazy(() => ProjectCreateNestedOneWithoutCompileLogsInputObjectSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutCompileLogsInputObjectSchema)
}).strict();
export const CompileLogCreateInputObjectSchema: z.ZodType<Prisma.CompileLogCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CompileLogCreateInput>;
export const CompileLogCreateInputObjectZodSchema = makeSchema();
