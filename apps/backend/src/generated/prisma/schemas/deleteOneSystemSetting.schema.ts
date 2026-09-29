import type { Prisma } from '../browser';
import * as z from 'zod';
import { SystemSettingSelectObjectSchema as SystemSettingSelectObjectSchema } from './objects/SystemSettingSelect.schema';
import { SystemSettingWhereUniqueInputObjectSchema as SystemSettingWhereUniqueInputObjectSchema } from './objects/SystemSettingWhereUniqueInput.schema';

export const SystemSettingDeleteOneSchema: z.ZodType<Prisma.SystemSettingDeleteArgs> = z.object({ select: SystemSettingSelectObjectSchema.optional(),  where: SystemSettingWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.SystemSettingDeleteArgs>;

export const SystemSettingDeleteOneZodSchema = z.object({ select: SystemSettingSelectObjectSchema.optional(),  where: SystemSettingWhereUniqueInputObjectSchema }).strict();