import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectArgsObjectSchema as ProjectArgsObjectSchema } from './ProjectArgs.schema'

const makeSchema = () => z.object({
  project: z.union([z.boolean(), z.lazy(() => ProjectArgsObjectSchema)]).optional()
}).strict();
export const ProjectFileIncludeObjectSchema: z.ZodType<Prisma.ProjectFileInclude> = makeSchema() as unknown as z.ZodType<Prisma.ProjectFileInclude>;
export const ProjectFileIncludeObjectZodSchema = makeSchema();
