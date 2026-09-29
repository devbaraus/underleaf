import * as z from 'zod';
import { ProjectSelectObjectSchema as ProjectSelectObjectSchema } from './ProjectSelect.schema';
import { ProjectIncludeObjectSchema as ProjectIncludeObjectSchema } from './ProjectInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ProjectSelectObjectSchema).optional(),
  include: z.lazy(() => ProjectIncludeObjectSchema).optional()
}).strict();
export const ProjectArgsObjectSchema = makeSchema();
export const ProjectArgsObjectZodSchema = makeSchema();
