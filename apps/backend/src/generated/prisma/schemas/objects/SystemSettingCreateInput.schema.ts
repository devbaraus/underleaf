import * as z from 'zod';
import type { Prisma } from '../../browser';


const makeSchema = () => z.object({
  key: z.string(),
  value: z.string(),
  description: z.string().optional()
}).strict();
export const SystemSettingCreateInputObjectSchema: z.ZodType<Prisma.SystemSettingCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.SystemSettingCreateInput>;
export const SystemSettingCreateInputObjectZodSchema = makeSchema();
