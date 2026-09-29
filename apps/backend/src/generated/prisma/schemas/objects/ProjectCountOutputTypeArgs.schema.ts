import * as z from 'zod';
import { ProjectCountOutputTypeSelectObjectSchema as ProjectCountOutputTypeSelectObjectSchema } from './ProjectCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ProjectCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const ProjectCountOutputTypeArgsObjectSchema = makeSchema();
export const ProjectCountOutputTypeArgsObjectZodSchema = makeSchema();
