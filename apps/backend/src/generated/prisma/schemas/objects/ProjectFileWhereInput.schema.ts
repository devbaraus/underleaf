import * as z from 'zod';
import type { Prisma } from '../../browser';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { ProjectScalarRelationFilterObjectSchema as ProjectScalarRelationFilterObjectSchema } from './ProjectScalarRelationFilter.schema';
import { ProjectWhereInputObjectSchema as ProjectWhereInputObjectSchema } from './ProjectWhereInput.schema'

const projectfilewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ProjectFileWhereInputObjectSchema), z.lazy(() => ProjectFileWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ProjectFileWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ProjectFileWhereInputObjectSchema), z.lazy(() => ProjectFileWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  projectId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  path: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  content: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  isMain: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  type: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  sizeBytes: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  project: z.union([z.lazy(() => ProjectScalarRelationFilterObjectSchema), z.lazy(() => ProjectWhereInputObjectSchema)]).optional()
}).strict();
export const ProjectFileWhereInputObjectSchema: z.ZodType<Prisma.ProjectFileWhereInput> = projectfilewhereinputSchema as unknown as z.ZodType<Prisma.ProjectFileWhereInput>;
export const ProjectFileWhereInputObjectZodSchema = projectfilewhereinputSchema;
