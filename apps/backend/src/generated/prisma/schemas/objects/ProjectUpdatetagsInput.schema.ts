import * as z from 'zod';
import type { Prisma } from '../../browser';


const makeSchema = () => z.object({
  set: z.string().array().optional(),
  push: z.union([z.string(), z.string().array()]).optional()
}).strict();
export const ProjectUpdatetagsInputObjectSchema: z.ZodType<Prisma.ProjectUpdatetagsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectUpdatetagsInput>;
export const ProjectUpdatetagsInputObjectZodSchema = makeSchema();
