import type { Prisma } from '../browser';
import * as z from 'zod';
import { SystemSettingSelectObjectSchema as SystemSettingSelectObjectSchema } from './objects/SystemSettingSelect.schema';
import { SystemSettingUpdateManyMutationInputObjectSchema as SystemSettingUpdateManyMutationInputObjectSchema } from './objects/SystemSettingUpdateManyMutationInput.schema';
import { SystemSettingWhereInputObjectSchema as SystemSettingWhereInputObjectSchema } from './objects/SystemSettingWhereInput.schema';

export const SystemSettingUpdateManyAndReturnSchema: z.ZodType<Prisma.SystemSettingUpdateManyAndReturnArgs> = z.object({ select: SystemSettingSelectObjectSchema.optional(), data: SystemSettingUpdateManyMutationInputObjectSchema, where: SystemSettingWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.SystemSettingUpdateManyAndReturnArgs>;

export const SystemSettingUpdateManyAndReturnZodSchema = z.object({ select: SystemSettingSelectObjectSchema.optional(), data: SystemSettingUpdateManyMutationInputObjectSchema, where: SystemSettingWhereInputObjectSchema.optional() }).strict();