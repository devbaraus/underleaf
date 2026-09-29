import * as z from 'zod';
import type { Prisma } from '../../browser';


const makeSchema = () => z.object({
  quotaMb: z.literal(true).optional(),
  storageUsedMb: z.literal(true).optional()
}).strict();
export const UserAvgAggregateInputObjectSchema: z.ZodType<Prisma.UserAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.UserAvgAggregateInputType>;
export const UserAvgAggregateInputObjectZodSchema = makeSchema();
