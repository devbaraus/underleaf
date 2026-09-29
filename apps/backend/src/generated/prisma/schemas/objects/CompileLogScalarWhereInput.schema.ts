import * as z from 'zod';
import type { Prisma } from '../../browser';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { JsonFilterObjectSchema as JsonFilterObjectSchema } from './JsonFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const compilelogscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CompileLogScalarWhereInputObjectSchema), z.lazy(() => CompileLogScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CompileLogScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CompileLogScalarWhereInputObjectSchema), z.lazy(() => CompileLogScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  projectId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  success: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  durationMs: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  errors: z.lazy(() => JsonFilterObjectSchema).optional(),
  rawOutput: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  engine: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const CompileLogScalarWhereInputObjectSchema: z.ZodType<Prisma.CompileLogScalarWhereInput> = compilelogscalarwhereinputSchema as unknown as z.ZodType<Prisma.CompileLogScalarWhereInput>;
export const CompileLogScalarWhereInputObjectZodSchema = compilelogscalarwhereinputSchema;
