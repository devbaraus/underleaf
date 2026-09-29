import * as z from 'zod';
import type { Prisma } from '../../browser';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { JsonFilterObjectSchema as JsonFilterObjectSchema } from './JsonFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { ProjectScalarRelationFilterObjectSchema as ProjectScalarRelationFilterObjectSchema } from './ProjectScalarRelationFilter.schema';
import { ProjectWhereInputObjectSchema as ProjectWhereInputObjectSchema } from './ProjectWhereInput.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const compilelogwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CompileLogWhereInputObjectSchema), z.lazy(() => CompileLogWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CompileLogWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CompileLogWhereInputObjectSchema), z.lazy(() => CompileLogWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  projectId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  success: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  durationMs: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  errors: z.lazy(() => JsonFilterObjectSchema).optional(),
  rawOutput: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  engine: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  project: z.union([z.lazy(() => ProjectScalarRelationFilterObjectSchema), z.lazy(() => ProjectWhereInputObjectSchema)]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional()
}).strict();
export const CompileLogWhereInputObjectSchema: z.ZodType<Prisma.CompileLogWhereInput> = compilelogwhereinputSchema as unknown as z.ZodType<Prisma.CompileLogWhereInput>;
export const CompileLogWhereInputObjectZodSchema = compilelogwhereinputSchema;
