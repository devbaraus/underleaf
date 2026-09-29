import * as z from 'zod';
import type { Prisma } from '../../browser';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { BoolWithAggregatesFilterObjectSchema as BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const projectfilescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => ProjectFileScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ProjectFileScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ProjectFileScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ProjectFileScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ProjectFileScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  projectId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  path: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  content: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  isMain: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  type: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  sizeBytes: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const ProjectFileScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.ProjectFileScalarWhereWithAggregatesInput> = projectfilescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.ProjectFileScalarWhereWithAggregatesInput>;
export const ProjectFileScalarWhereWithAggregatesInputObjectZodSchema = projectfilescalarwherewithaggregatesinputSchema;
