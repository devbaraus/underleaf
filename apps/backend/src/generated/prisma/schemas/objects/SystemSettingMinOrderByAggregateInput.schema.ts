import * as z from 'zod';
import type { Prisma } from '../../browser';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  key: SortOrderSchema.optional(),
  value: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const SystemSettingMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.SystemSettingMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.SystemSettingMinOrderByAggregateInput>;
export const SystemSettingMinOrderByAggregateInputObjectZodSchema = makeSchema();
