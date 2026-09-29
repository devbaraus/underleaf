import * as z from 'zod';
import type { Prisma } from '../../browser';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { ProjectFileFindManySchema as ProjectFileFindManySchema } from '../findManyProjectFile.schema';
import { CompileLogFindManySchema as CompileLogFindManySchema } from '../findManyCompileLog.schema';
import { ProjectCountOutputTypeArgsObjectSchema as ProjectCountOutputTypeArgsObjectSchema } from './ProjectCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  ownerId: z.boolean().optional(),
  template: z.boolean().optional(),
  compilerEngine: z.boolean().optional(),
  status: z.boolean().optional(),
  lastCompiledAt: z.boolean().optional(),
  hasPdf: z.boolean().optional(),
  storageBytes: z.boolean().optional(),
  compilationCount: z.boolean().optional(),
  tags: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  owner: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  files: z.union([z.boolean(), z.lazy(() => ProjectFileFindManySchema)]).optional(),
  compileLogs: z.union([z.boolean(), z.lazy(() => CompileLogFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ProjectCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ProjectSelectObjectSchema: z.ZodType<Prisma.ProjectSelect> = makeSchema() as unknown as z.ZodType<Prisma.ProjectSelect>;
export const ProjectSelectObjectZodSchema = makeSchema();
