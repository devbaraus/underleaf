import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectFileWhereInputObjectSchema as ProjectFileWhereInputObjectSchema } from './ProjectFileWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => ProjectFileWhereInputObjectSchema).optional(),
  some: z.lazy(() => ProjectFileWhereInputObjectSchema).optional(),
  none: z.lazy(() => ProjectFileWhereInputObjectSchema).optional()
}).strict();
export const ProjectFileListRelationFilterObjectSchema: z.ZodType<Prisma.ProjectFileListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ProjectFileListRelationFilter>;
export const ProjectFileListRelationFilterObjectZodSchema = makeSchema();
