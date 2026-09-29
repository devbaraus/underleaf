import * as z from 'zod';
import type { Prisma } from '../../browser';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  title: z.literal(true).optional(),
  description: z.literal(true).optional(),
  ownerId: z.literal(true).optional(),
  template: z.literal(true).optional(),
  compilerEngine: z.literal(true).optional(),
  status: z.literal(true).optional(),
  lastCompiledAt: z.literal(true).optional(),
  hasPdf: z.literal(true).optional(),
  storageBytes: z.literal(true).optional(),
  compilationCount: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const ProjectMaxAggregateInputObjectSchema: z.ZodType<Prisma.ProjectMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProjectMaxAggregateInputType>;
export const ProjectMaxAggregateInputObjectZodSchema = makeSchema();
