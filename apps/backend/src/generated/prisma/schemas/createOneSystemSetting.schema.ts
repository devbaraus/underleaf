import type { Prisma } from '../browser';
import * as z from 'zod';
import { SystemSettingSelectObjectSchema as SystemSettingSelectObjectSchema } from './objects/SystemSettingSelect.schema';
import { SystemSettingCreateInputObjectSchema as SystemSettingCreateInputObjectSchema } from './objects/SystemSettingCreateInput.schema';
import { SystemSettingUncheckedCreateInputObjectSchema as SystemSettingUncheckedCreateInputObjectSchema } from './objects/SystemSettingUncheckedCreateInput.schema';

export const SystemSettingCreateOneSchema: z.ZodType<Prisma.SystemSettingCreateArgs> = z.object({ select: SystemSettingSelectObjectSchema.optional(),  data: z.union([SystemSettingCreateInputObjectSchema, SystemSettingUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.SystemSettingCreateArgs>;

export const SystemSettingCreateOneZodSchema = z.object({ select: SystemSettingSelectObjectSchema.optional(),  data: z.union([SystemSettingCreateInputObjectSchema, SystemSettingUncheckedCreateInputObjectSchema]) }).strict();