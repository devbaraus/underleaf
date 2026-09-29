import * as z from 'zod';
import type { Prisma } from '../../browser';


const makeSchema = () => z.object({
  key: z.string(),
  value: z.string(),
  description: z.string().optional()
}).strict();
export const SystemSettingUncheckedCreateInputObjectSchema: z.ZodType<Prisma.SystemSettingUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.SystemSettingUncheckedCreateInput>;
export const SystemSettingUncheckedCreateInputObjectZodSchema = makeSchema();
