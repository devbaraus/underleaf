import type { Prisma } from '../browser';
import * as z from 'zod';
import { SystemSettingSelectObjectSchema as SystemSettingSelectObjectSchema } from './objects/SystemSettingSelect.schema';
import { SystemSettingWhereUniqueInputObjectSchema as SystemSettingWhereUniqueInputObjectSchema } from './objects/SystemSettingWhereUniqueInput.schema';

export const SystemSettingFindUniqueOrThrowSchema: z.ZodType<Prisma.SystemSettingFindUniqueOrThrowArgs> = z.object({ select: SystemSettingSelectObjectSchema.optional(),  where: SystemSettingWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.SystemSettingFindUniqueOrThrowArgs>;

export const SystemSettingFindUniqueOrThrowZodSchema = z.object({ select: SystemSettingSelectObjectSchema.optional(),  where: SystemSettingWhereUniqueInputObjectSchema }).strict();