import * as z from 'zod';
import type { Prisma } from '../../browser';


const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  path: z.string(),
  content: z.string(),
  isMain: z.boolean().optional(),
  type: z.string().optional(),
  sizeBytes: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const ProjectFileUncheckedCreateWithoutProjectInputObjectSchema: z.ZodType<Prisma.ProjectFileUncheckedCreateWithoutProjectInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectFileUncheckedCreateWithoutProjectInput>;
export const ProjectFileUncheckedCreateWithoutProjectInputObjectZodSchema = makeSchema();
