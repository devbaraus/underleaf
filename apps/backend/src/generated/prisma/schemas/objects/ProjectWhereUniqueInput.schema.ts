import * as z from 'zod';
import type { Prisma } from '../../browser';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const ProjectWhereUniqueInputObjectSchema: z.ZodType<Prisma.ProjectWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectWhereUniqueInput>;
export const ProjectWhereUniqueInputObjectZodSchema = makeSchema();
