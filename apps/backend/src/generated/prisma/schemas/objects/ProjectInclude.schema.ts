import * as z from 'zod';
import type { Prisma } from '../../browser';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { ProjectFileFindManySchema as ProjectFileFindManySchema } from '../findManyProjectFile.schema';
import { CompileLogFindManySchema as CompileLogFindManySchema } from '../findManyCompileLog.schema';
import { ProjectCountOutputTypeArgsObjectSchema as ProjectCountOutputTypeArgsObjectSchema } from './ProjectCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  owner: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  files: z.union([z.boolean(), z.lazy(() => ProjectFileFindManySchema)]).optional(),
  compileLogs: z.union([z.boolean(), z.lazy(() => CompileLogFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ProjectCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ProjectIncludeObjectSchema: z.ZodType<Prisma.ProjectInclude> = makeSchema() as unknown as z.ZodType<Prisma.ProjectInclude>;
export const ProjectIncludeObjectZodSchema = makeSchema();
