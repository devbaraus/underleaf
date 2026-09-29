import type { Prisma } from '../browser';
import * as z from 'zod';
import { SystemSettingSelectObjectSchema as SystemSettingSelectObjectSchema } from './objects/SystemSettingSelect.schema';
import { SystemSettingWhereUniqueInputObjectSchema as SystemSettingWhereUniqueInputObjectSchema } from './objects/SystemSettingWhereUniqueInput.schema';
import { SystemSettingCreateInputObjectSchema as SystemSettingCreateInputObjectSchema } from './objects/SystemSettingCreateInput.schema';
import { SystemSettingUncheckedCreateInputObjectSchema as SystemSettingUncheckedCreateInputObjectSchema } from './objects/SystemSettingUncheckedCreateInput.schema';
import { SystemSettingUpdateInputObjectSchema as SystemSettingUpdateInputObjectSchema } from './objects/SystemSettingUpdateInput.schema';
import { SystemSettingUncheckedUpdateInputObjectSchema as SystemSettingUncheckedUpdateInputObjectSchema } from './objects/SystemSettingUncheckedUpdateInput.schema';

export const SystemSettingUpsertOneSchema: z.ZodType<Prisma.SystemSettingUpsertArgs> = z.object({ select: SystemSettingSelectObjectSchema.optional(),  where: SystemSettingWhereUniqueInputObjectSchema, create: z.union([ SystemSettingCreateInputObjectSchema, SystemSettingUncheckedCreateInputObjectSchema ]), update: z.union([ SystemSettingUpdateInputObjectSchema, SystemSettingUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.SystemSettingUpsertArgs>;

export const SystemSettingUpsertOneZodSchema = z.object({ select: SystemSettingSelectObjectSchema.optional(),  where: SystemSettingWhereUniqueInputObjectSchema, create: z.union([ SystemSettingCreateInputObjectSchema, SystemSettingUncheckedCreateInputObjectSchema ]), update: z.union([ SystemSettingUpdateInputObjectSchema, SystemSettingUncheckedUpdateInputObjectSchema ]) }).strict();