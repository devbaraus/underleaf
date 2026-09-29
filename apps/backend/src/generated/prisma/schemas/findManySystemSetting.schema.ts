import type { Prisma } from '../browser';
import * as z from 'zod';
import { SystemSettingOrderByWithRelationInputObjectSchema as SystemSettingOrderByWithRelationInputObjectSchema } from './objects/SystemSettingOrderByWithRelationInput.schema';
import { SystemSettingWhereInputObjectSchema as SystemSettingWhereInputObjectSchema } from './objects/SystemSettingWhereInput.schema';
import { SystemSettingWhereUniqueInputObjectSchema as SystemSettingWhereUniqueInputObjectSchema } from './objects/SystemSettingWhereUniqueInput.schema';
import { SystemSettingScalarFieldEnumSchema } from './enums/SystemSettingScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const SystemSettingFindManySelectSchema: z.ZodType<Prisma.SystemSettingSelect> = z.object({
    key: z.boolean().optional(),
    value: z.boolean().optional(),
    description: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.SystemSettingSelect>;

export const SystemSettingFindManySelectZodSchema = z.object({
    key: z.boolean().optional(),
    value: z.boolean().optional(),
    description: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const SystemSettingFindManySchema: z.ZodType<Prisma.SystemSettingFindManyArgs> = z.object({ select: SystemSettingFindManySelectSchema.optional(),  orderBy: z.union([SystemSettingOrderByWithRelationInputObjectSchema, SystemSettingOrderByWithRelationInputObjectSchema.array()]).optional(), where: SystemSettingWhereInputObjectSchema.optional(), cursor: SystemSettingWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([SystemSettingScalarFieldEnumSchema, SystemSettingScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.SystemSettingFindManyArgs>;

export const SystemSettingFindManyZodSchema = z.object({ select: SystemSettingFindManySelectSchema.optional(),  orderBy: z.union([SystemSettingOrderByWithRelationInputObjectSchema, SystemSettingOrderByWithRelationInputObjectSchema.array()]).optional(), where: SystemSettingWhereInputObjectSchema.optional(), cursor: SystemSettingWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([SystemSettingScalarFieldEnumSchema, SystemSettingScalarFieldEnumSchema.array()]).optional() }).strict();