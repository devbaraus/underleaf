import * as z from 'zod';
import type { Prisma } from '../../browser';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  quotaMb: SortOrderSchema.optional(),
  storageUsedMb: SortOrderSchema.optional()
}).strict();
export const UserSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserSumOrderByAggregateInput>;
export const UserSumOrderByAggregateInputObjectZodSchema = makeSchema();
