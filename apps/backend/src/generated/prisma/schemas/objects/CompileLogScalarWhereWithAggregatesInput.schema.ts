import * as z from 'zod';
import type { Prisma } from '../../browser';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { BoolWithAggregatesFilterObjectSchema as BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { JsonWithAggregatesFilterObjectSchema as JsonWithAggregatesFilterObjectSchema } from './JsonWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const compilelogscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => CompileLogScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CompileLogScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CompileLogScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CompileLogScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CompileLogScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  projectId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  success: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  durationMs: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  errors: z.lazy(() => JsonWithAggregatesFilterObjectSchema).optional(),
  rawOutput: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  engine: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const CompileLogScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.CompileLogScalarWhereWithAggregatesInput> = compilelogscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.CompileLogScalarWhereWithAggregatesInput>;
export const CompileLogScalarWhereWithAggregatesInputObjectZodSchema = compilelogscalarwherewithaggregatesinputSchema;
