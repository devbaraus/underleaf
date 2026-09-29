import type { Prisma } from '../browser';
import * as z from 'zod';
import { SystemSettingSelectObjectSchema as SystemSettingSelectObjectSchema } from './objects/SystemSettingSelect.schema';
import { SystemSettingCreateManyInputObjectSchema as SystemSettingCreateManyInputObjectSchema } from './objects/SystemSettingCreateManyInput.schema';

export const SystemSettingCreateManyAndReturnSchema: z.ZodType<Prisma.SystemSettingCreateManyAndReturnArgs> = z.object({ select: SystemSettingSelectObjectSchema.optional(), data: z.union([ SystemSettingCreateManyInputObjectSchema, z.array(SystemSettingCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.SystemSettingCreateManyAndReturnArgs>;

export const SystemSettingCreateManyAndReturnZodSchema = z.object({ select: SystemSettingSelectObjectSchema.optional(), data: z.union([ SystemSettingCreateManyInputObjectSchema, z.array(SystemSettingCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();