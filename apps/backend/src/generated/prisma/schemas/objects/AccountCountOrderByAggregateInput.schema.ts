import * as z from 'zod';
import type { Prisma } from '../../browser';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  accountId: SortOrderSchema.optional(),
  providerId: SortOrderSchema.optional(),
  password: SortOrderSchema.optional(),
  accessToken: SortOrderSchema.optional(),
  refreshToken: SortOrderSchema.optional(),
  idToken: SortOrderSchema.optional(),
  accessTokenExpiresAt: SortOrderSchema.optional(),
  refreshTokenExpiresAt: SortOrderSchema.optional(),
  scope: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const AccountCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountCountOrderByAggregateInput>;
export const AccountCountOrderByAggregateInputObjectZodSchema = makeSchema();
