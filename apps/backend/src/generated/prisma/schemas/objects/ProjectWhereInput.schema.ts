import * as z from 'zod';
import type { Prisma } from '../../browser';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringNullableListFilterObjectSchema as StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { ProjectFileListRelationFilterObjectSchema as ProjectFileListRelationFilterObjectSchema } from './ProjectFileListRelationFilter.schema';
import { CompileLogListRelationFilterObjectSchema as CompileLogListRelationFilterObjectSchema } from './CompileLogListRelationFilter.schema'

const projectwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ProjectWhereInputObjectSchema), z.lazy(() => ProjectWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ProjectWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ProjectWhereInputObjectSchema), z.lazy(() => ProjectWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  ownerId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  template: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  compilerEngine: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  lastCompiledAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  hasPdf: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  storageBytes: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  compilationCount: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  tags: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  owner: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  files: z.lazy(() => ProjectFileListRelationFilterObjectSchema).optional(),
  compileLogs: z.lazy(() => CompileLogListRelationFilterObjectSchema).optional()
}).strict();
export const ProjectWhereInputObjectSchema: z.ZodType<Prisma.ProjectWhereInput> = projectwhereinputSchema as unknown as z.ZodType<Prisma.ProjectWhereInput>;
export const ProjectWhereInputObjectZodSchema = projectwhereinputSchema;
