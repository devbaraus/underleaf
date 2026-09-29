import * as z from 'zod';
import type { Prisma } from '../../browser';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ProjectFileCountOrderByAggregateInputObjectSchema as ProjectFileCountOrderByAggregateInputObjectSchema } from './ProjectFileCountOrderByAggregateInput.schema';
import { ProjectFileAvgOrderByAggregateInputObjectSchema as ProjectFileAvgOrderByAggregateInputObjectSchema } from './ProjectFileAvgOrderByAggregateInput.schema';
import { ProjectFileMaxOrderByAggregateInputObjectSchema as ProjectFileMaxOrderByAggregateInputObjectSchema } from './ProjectFileMaxOrderByAggregateInput.schema';
import { ProjectFileMinOrderByAggregateInputObjectSchema as ProjectFileMinOrderByAggregateInputObjectSchema } from './ProjectFileMinOrderByAggregateInput.schema';
import { ProjectFileSumOrderByAggregateInputObjectSchema as ProjectFileSumOrderByAggregateInputObjectSchema } from './ProjectFileSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  projectId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  path: SortOrderSchema.optional(),
  content: SortOrderSchema.optional(),
  isMain: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  sizeBytes: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => ProjectFileCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => ProjectFileAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ProjectFileMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ProjectFileMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => ProjectFileSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ProjectFileOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ProjectFileOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectFileOrderByWithAggregationInput>;
export const ProjectFileOrderByWithAggregationInputObjectZodSchema = makeSchema();
