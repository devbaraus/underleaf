import type { Prisma } from '../browser';
import * as z from 'zod';
import { SystemSettingUpdateManyMutationInputObjectSchema as SystemSettingUpdateManyMutationInputObjectSchema } from './objects/SystemSettingUpdateManyMutationInput.schema';
import { SystemSettingWhereInputObjectSchema as SystemSettingWhereInputObjectSchema } from './objects/SystemSettingWhereInput.schema';

export const SystemSettingUpdateManySchema: z.ZodType<Prisma.SystemSettingUpdateManyArgs> = z.object({ data: SystemSettingUpdateManyMutationInputObjectSchema, where: SystemSettingWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.SystemSettingUpdateManyArgs>;

export const SystemSettingUpdateManyZodSchema = z.object({ data: SystemSettingUpdateManyMutationInputObjectSchema, where: SystemSettingWhereInputObjectSchema.optional() }).strict();