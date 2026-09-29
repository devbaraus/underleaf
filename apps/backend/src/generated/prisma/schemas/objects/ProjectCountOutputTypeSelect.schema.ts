import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectCountOutputTypeCountFilesArgsObjectSchema as ProjectCountOutputTypeCountFilesArgsObjectSchema } from './ProjectCountOutputTypeCountFilesArgs.schema';
import { ProjectCountOutputTypeCountCompileLogsArgsObjectSchema as ProjectCountOutputTypeCountCompileLogsArgsObjectSchema } from './ProjectCountOutputTypeCountCompileLogsArgs.schema'

const makeSchema = () => z.object({
  files: z.union([z.boolean(), z.lazy(() => ProjectCountOutputTypeCountFilesArgsObjectSchema)]).optional(),
  compileLogs: z.union([z.boolean(), z.lazy(() => ProjectCountOutputTypeCountCompileLogsArgsObjectSchema)]).optional()
}).strict();
export const ProjectCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.ProjectCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.ProjectCountOutputTypeSelect>;
export const ProjectCountOutputTypeSelectObjectZodSchema = makeSchema();
