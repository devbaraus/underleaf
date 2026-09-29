import * as z from 'zod';
import type { Prisma } from '../../browser';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SystemSettingCountOrderByAggregateInputObjectSchema as SystemSettingCountOrderByAggregateInputObjectSchema } from './SystemSettingCountOrderByAggregateInput.schema';
import { SystemSettingMaxOrderByAggregateInputObjectSchema as SystemSettingMaxOrderByAggregateInputObjectSchema } from './SystemSettingMaxOrderByAggregateInput.schema';
import { SystemSettingMinOrderByAggregateInputObjectSchema as SystemSettingMinOrderByAggregateInputObjectSchema } from './SystemSettingMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  key: SortOrderSchema.optional(),
  value: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => SystemSettingCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => SystemSettingMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => SystemSettingMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const SystemSettingOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.SystemSettingOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.SystemSettingOrderByWithAggregationInput>;
export const SystemSettingOrderByWithAggregationInputObjectZodSchema = makeSchema();
