import type { Prisma } from '../browser';
import * as z from 'zod';
import { SystemSettingCreateManyInputObjectSchema as SystemSettingCreateManyInputObjectSchema } from './objects/SystemSettingCreateManyInput.schema';

export const SystemSettingCreateManySchema: z.ZodType<Prisma.SystemSettingCreateManyArgs> = z.object({ data: z.union([ SystemSettingCreateManyInputObjectSchema, z.array(SystemSettingCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.SystemSettingCreateManyArgs>;

export const SystemSettingCreateManyZodSchema = z.object({ data: z.union([ SystemSettingCreateManyInputObjectSchema, z.array(SystemSettingCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();