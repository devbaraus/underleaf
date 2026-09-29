import * as z from 'zod';
import type { Prisma } from '../../browser';


const makeSchema = () => z.object({
  projectId: z.string(),
  path: z.string()
}).strict();
export const ProjectFileProjectIdPathCompoundUniqueInputObjectSchema: z.ZodType<Prisma.ProjectFileProjectIdPathCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectFileProjectIdPathCompoundUniqueInput>;
export const ProjectFileProjectIdPathCompoundUniqueInputObjectZodSchema = makeSchema();
