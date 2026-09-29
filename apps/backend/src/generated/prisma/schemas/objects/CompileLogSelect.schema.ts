import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectArgsObjectSchema as ProjectArgsObjectSchema } from './ProjectArgs.schema';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  projectId: z.boolean().optional(),
  userId: z.boolean().optional(),
  success: z.boolean().optional(),
  durationMs: z.boolean().optional(),
  errors: z.boolean().optional(),
  rawOutput: z.boolean().optional(),
  engine: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  project: z.union([z.boolean(), z.lazy(() => ProjectArgsObjectSchema)]).optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
}).strict();
export const CompileLogSelectObjectSchema: z.ZodType<Prisma.CompileLogSelect> = makeSchema() as unknown as z.ZodType<Prisma.CompileLogSelect>;
export const CompileLogSelectObjectZodSchema = makeSchema();
