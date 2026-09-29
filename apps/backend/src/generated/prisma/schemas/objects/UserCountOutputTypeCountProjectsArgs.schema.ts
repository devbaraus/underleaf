import * as z from 'zod';
import { ProjectWhereInputObjectSchema as ProjectWhereInputObjectSchema } from './ProjectWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProjectWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountProjectsArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountProjectsArgsObjectZodSchema = makeSchema();
