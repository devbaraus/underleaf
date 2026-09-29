import type { Prisma } from '../browser';
import * as z from 'zod';
import { SystemSettingSelectObjectSchema as SystemSettingSelectObjectSchema } from './objects/SystemSettingSelect.schema';
import { SystemSettingUpdateInputObjectSchema as SystemSettingUpdateInputObjectSchema } from './objects/SystemSettingUpdateInput.schema';
import { SystemSettingUncheckedUpdateInputObjectSchema as SystemSettingUncheckedUpdateInputObjectSchema } from './objects/SystemSettingUncheckedUpdateInput.schema';
import { SystemSettingWhereUniqueInputObjectSchema as SystemSettingWhereUniqueInputObjectSchema } from './objects/SystemSettingWhereUniqueInput.schema';

export const SystemSettingUpdateOneSchema: z.ZodType<Prisma.SystemSettingUpdateArgs> = z.object({ select: SystemSettingSelectObjectSchema.optional(),  data: z.union([SystemSettingUpdateInputObjectSchema, SystemSettingUncheckedUpdateInputObjectSchema]), where: SystemSettingWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.SystemSettingUpdateArgs>;

export const SystemSettingUpdateOneZodSchema = z.object({ select: SystemSettingSelectObjectSchema.optional(),  data: z.union([SystemSettingUpdateInputObjectSchema, SystemSettingUncheckedUpdateInputObjectSchema]), where: SystemSettingWhereUniqueInputObjectSchema }).strict();