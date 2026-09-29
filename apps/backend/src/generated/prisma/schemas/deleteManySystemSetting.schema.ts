import type { Prisma } from '../browser';
import * as z from 'zod';
import { SystemSettingWhereInputObjectSchema as SystemSettingWhereInputObjectSchema } from './objects/SystemSettingWhereInput.schema';

export const SystemSettingDeleteManySchema: z.ZodType<Prisma.SystemSettingDeleteManyArgs> = z.object({ where: SystemSettingWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.SystemSettingDeleteManyArgs>;

export const SystemSettingDeleteManyZodSchema = z.object({ where: SystemSettingWhereInputObjectSchema.optional() }).strict();