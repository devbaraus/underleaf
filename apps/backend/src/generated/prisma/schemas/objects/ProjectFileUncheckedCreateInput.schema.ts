import * as z from 'zod';
import type { Prisma } from '../../browser';


const makeSchema = () => z.object({
  id: z.string().optional(),
  projectId: z.string(),
  name: z.string(),
  path: z.string(),
  content: z.string(),
  isMain: z.boolean().optional(),
  type: z.string().optional(),
  sizeBytes: z.number().int().optional(),
  createdAt: z.coerce.date().optional()
}).strict();
export const ProjectFileUncheckedCreateInputObjectSchema: z.ZodType<Prisma.ProjectFileUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectFileUncheckedCreateInput>;
export const ProjectFileUncheckedCreateInputObjectZodSchema = makeSchema();
