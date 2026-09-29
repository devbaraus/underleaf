import * as z from 'zod';
import type { Prisma } from '../../browser';


const makeSchema = () => z.object({
  key: z.boolean().optional(),
  value: z.boolean().optional(),
  description: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const SystemSettingSelectObjectSchema: z.ZodType<Prisma.SystemSettingSelect> = makeSchema() as unknown as z.ZodType<Prisma.SystemSettingSelect>;
export const SystemSettingSelectObjectZodSchema = makeSchema();
