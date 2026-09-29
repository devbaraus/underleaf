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
export const ProjectFileMinAggregateInputObjectSchema: z.ZodType<Prisma.ProjectFileMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProjectFileMinAggregateInputType>;
export const ProjectFileMinAggregateInputObjectZodSchema = makeSchema();
