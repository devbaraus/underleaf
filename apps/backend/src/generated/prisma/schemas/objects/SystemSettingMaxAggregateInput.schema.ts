import * as z from 'zod';
import type { Prisma } from '../../browser';


const makeSchema = () => z.object({
  key: z.literal(true).optional(),
  value: z.literal(true).optional(),
  description: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const SystemSettingMaxAggregateInputObjectSchema: z.ZodType<Prisma.SystemSettingMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.SystemSettingMaxAggregateInputType>;
export const SystemSettingMaxAggregateInputObjectZodSchema = makeSchema();
