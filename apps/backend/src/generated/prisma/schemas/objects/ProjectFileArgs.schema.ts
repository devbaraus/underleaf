import * as z from 'zod';
import { ProjectFileSelectObjectSchema as ProjectFileSelectObjectSchema } from './ProjectFileSelect.schema';
import { ProjectFileIncludeObjectSchema as ProjectFileIncludeObjectSchema } from './ProjectFileInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ProjectFileSelectObjectSchema).optional(),
  include: z.lazy(() => ProjectFileIncludeObjectSchema).optional()
}).strict();
export const ProjectFileArgsObjectSchema = makeSchema();
export const ProjectFileArgsObjectZodSchema = makeSchema();
