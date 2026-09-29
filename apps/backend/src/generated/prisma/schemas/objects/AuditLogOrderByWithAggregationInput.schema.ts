import * as z from 'zod';
import type { Prisma } from '../../browser';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { AuditLogCountOrderByAggregateInputObjectSchema as AuditLogCountOrderByAggregateInputObjectSchema } from './AuditLogCountOrderByAggregateInput.schema';
import { AuditLogMaxOrderByAggregateInputObjectSchema as AuditLogMaxOrderByAggregateInputObjectSchema } from './AuditLogMaxOrderByAggregateInput.schema';
import { AuditLogMinOrderByAggregateInputObjectSchema as AuditLogMinOrderByAggregateInputObjectSchema } from './AuditLogMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  model: SortOrderSchema.optional(),
  action: SortOrderSchema.optional(),
  recordId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  userId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  after: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => AuditLogCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => AuditLogMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => AuditLogMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const AuditLogOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.AuditLogOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.AuditLogOrderByWithAggregationInput>;
export const AuditLogOrderByWithAggregationInputObjectZodSchema = makeSchema();
