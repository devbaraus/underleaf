import * as z from 'zod';
import type { Prisma } from '../../browser';


const makeSchema = () => z.object({
  set: z.string().array()
}).strict();
export const ProjectCreatetagsInputObjectSchema: z.ZodType<Prisma.ProjectCreatetagsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectCreatetagsInput>;
export const ProjectCreatetagsInputObjectZodSchema = makeSchema();
