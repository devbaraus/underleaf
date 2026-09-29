import type { Prisma } from '../browser';
import * as z from 'zod';
import { SystemSettingSelectObjectSchema as SystemSettingSelectObjectSchema } from './objects/SystemSettingSelect.schema';
import { SystemSettingWhereUniqueInputObjectSchema as SystemSettingWhereUniqueInputObjectSchema } from './objects/SystemSettingWhereUniqueInput.schema';

export const SystemSettingFindUniqueSchema: z.ZodType<Prisma.SystemSettingFindUniqueArgs> = z.object({ select: SystemSettingSelectObjectSchema.optional(),  where: SystemSettingWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.SystemSettingFindUniqueArgs>;

export const SystemSettingFindUniqueZodSchema = z.object({ select: SystemSettingSelectObjectSchema.optional(),  where: SystemSettingWhereUniqueInputObjectSchema }).strict();