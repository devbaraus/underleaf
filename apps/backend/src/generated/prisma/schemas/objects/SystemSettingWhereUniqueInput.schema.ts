import * as z from 'zod';
import type { Prisma } from '../../browser';


const makeSchema = () => z.object({
  key: z.string().optional()
}).strict();
export const SystemSettingWhereUniqueInputObjectSchema: z.ZodType<Prisma.SystemSettingWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.SystemSettingWhereUniqueInput>;
export const SystemSettingWhereUniqueInputObjectZodSchema = makeSchema();
