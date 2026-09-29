import * as z from 'zod';
import type { Prisma } from '../../browser';


const makeSchema = () => z.object({
  quotaMb: z.literal(true).optional(),
  storageUsedMb: z.literal(true).optional()
}).strict();
export const UserSumAggregateInputObjectSchema: z.ZodType<Prisma.UserSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.UserSumAggregateInputType>;
export const UserSumAggregateInputObjectZodSchema = makeSchema();
