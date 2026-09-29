import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectArgsObjectSchema as ProjectArgsObjectSchema } from './ProjectArgs.schema';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  project: z.union([z.boolean(), z.lazy(() => ProjectArgsObjectSchema)]).optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
}).strict();
export const CompileLogIncludeObjectSchema: z.ZodType<Prisma.CompileLogInclude> = makeSchema() as unknown as z.ZodType<Prisma.CompileLogInclude>;
export const CompileLogIncludeObjectZodSchema = makeSchema();
