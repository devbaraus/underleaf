import * as z from 'zod';
import type { Prisma } from '../../browser';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  emailVerified: SortOrderSchema.optional(),
  image: SortOrderSchema.optional(),
  role: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  banned: SortOrderSchema.optional(),
  banReason: SortOrderSchema.optional(),
  banExpires: SortOrderSchema.optional(),
  quotaMb: SortOrderSchema.optional(),
  storageUsedMb: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const UserMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserMinOrderByAggregateInput>;
export const UserMinOrderByAggregateInputObjectZodSchema = makeSchema();
