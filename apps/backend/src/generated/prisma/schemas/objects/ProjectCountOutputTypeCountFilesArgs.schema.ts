import * as z from 'zod';
import { ProjectFileWhereInputObjectSchema as ProjectFileWhereInputObjectSchema } from './ProjectFileWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProjectFileWhereInputObjectSchema).optional()
}).strict();
export const ProjectCountOutputTypeCountFilesArgsObjectSchema = makeSchema();
export const ProjectCountOutputTypeCountFilesArgsObjectZodSchema = makeSchema();
