import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectWhereInputObjectSchema as ProjectWhereInputObjectSchema } from './ProjectWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => ProjectWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => ProjectWhereInputObjectSchema).optional()
}).strict();
export const ProjectScalarRelationFilterObjectSchema: z.ZodType<Prisma.ProjectScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ProjectScalarRelationFilter>;
export const ProjectScalarRelationFilterObjectZodSchema = makeSchema();
