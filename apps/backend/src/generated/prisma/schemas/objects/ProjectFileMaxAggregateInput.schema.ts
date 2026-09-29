import * as z from 'zod';
import type { Prisma } from '../../browser';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  projectId: z.literal(true).optional(),
  name: z.literal(true).optional(),
  path: z.literal(true).optional(),
  content: z.literal(true).optional(),
  isMain: z.literal(true).optional(),
  type: z.literal(true).optional(),
  sizeBytes: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const ProjectFileMaxAggregateInputObjectSchema: z.ZodType<Prisma.ProjectFileMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProjectFileMaxAggregateInputType>;
export const ProjectFileMaxAggregateInputObjectZodSchema = makeSchema();
