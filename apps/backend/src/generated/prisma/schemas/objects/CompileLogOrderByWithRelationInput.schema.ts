import * as z from 'zod';
import type { Prisma } from '../../browser';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ProjectOrderByWithRelationInputObjectSchema as ProjectOrderByWithRelationInputObjectSchema } from './ProjectOrderByWithRelationInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  projectId: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  success: SortOrderSchema.optional(),
  durationMs: SortOrderSchema.optional(),
  errors: SortOrderSchema.optional(),
  rawOutput: SortOrderSchema.optional(),
  engine: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  project: z.lazy(() => ProjectOrderByWithRelationInputObjectSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const CompileLogOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CompileLogOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.CompileLogOrderByWithRelationInput>;
export const CompileLogOrderByWithRelationInputObjectZodSchema = makeSchema();
