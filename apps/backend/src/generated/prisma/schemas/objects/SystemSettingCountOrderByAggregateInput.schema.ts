import * as z from 'zod';
import type { Prisma } from '../../browser';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  key: SortOrderSchema.optional(),
  value: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const SystemSettingCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.SystemSettingCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.SystemSettingCountOrderByAggregateInput>;
export const SystemSettingCountOrderByAggregateInputObjectZodSchema = makeSchema();
