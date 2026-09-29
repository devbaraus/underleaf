import * as z from 'zod';
import type { Prisma } from '../../browser';


const makeSchema = () => z.object({
  key: z.string(),
  value: z.string(),
  description: z.string().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const SystemSettingCreateManyInputObjectSchema: z.ZodType<Prisma.SystemSettingCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.SystemSettingCreateManyInput>;
export const SystemSettingCreateManyInputObjectZodSchema = makeSchema();
