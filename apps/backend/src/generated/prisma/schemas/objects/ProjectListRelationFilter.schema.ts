import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectWhereInputObjectSchema as ProjectWhereInputObjectSchema } from './ProjectWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => ProjectWhereInputObjectSchema).optional(),
  some: z.lazy(() => ProjectWhereInputObjectSchema).optional(),
  none: z.lazy(() => ProjectWhereInputObjectSchema).optional()
}).strict();
export const ProjectListRelationFilterObjectSchema: z.ZodType<Prisma.ProjectListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ProjectListRelationFilter>;
export const ProjectListRelationFilterObjectZodSchema = makeSchema();
