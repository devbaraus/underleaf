import * as z from 'zod';
import type { Prisma } from '../../browser';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { BoolWithAggregatesFilterObjectSchema as BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringNullableListFilterObjectSchema as StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const projectscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => ProjectScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ProjectScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ProjectScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ProjectScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ProjectScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  title: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  ownerId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  template: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  compilerEngine: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  lastCompiledAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  hasPdf: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  storageBytes: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  compilationCount: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  tags: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const ProjectScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.ProjectScalarWhereWithAggregatesInput> = projectscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.ProjectScalarWhereWithAggregatesInput>;
export const ProjectScalarWhereWithAggregatesInputObjectZodSchema = projectscalarwherewithaggregatesinputSchema;
