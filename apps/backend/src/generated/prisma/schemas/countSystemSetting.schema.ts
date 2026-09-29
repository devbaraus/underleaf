import type { Prisma } from '../browser';
import * as z from 'zod';
import { SystemSettingOrderByWithRelationInputObjectSchema as SystemSettingOrderByWithRelationInputObjectSchema } from './objects/SystemSettingOrderByWithRelationInput.schema';
import { SystemSettingWhereInputObjectSchema as SystemSettingWhereInputObjectSchema } from './objects/SystemSettingWhereInput.schema';
import { SystemSettingWhereUniqueInputObjectSchema as SystemSettingWhereUniqueInputObjectSchema } from './objects/SystemSettingWhereUniqueInput.schema';
import { SystemSettingCountAggregateInputObjectSchema as SystemSettingCountAggregateInputObjectSchema } from './objects/SystemSettingCountAggregateInput.schema';

export const SystemSettingCountSchema: z.ZodType<Prisma.SystemSettingCountArgs> = z.object({ orderBy: z.union([SystemSettingOrderByWithRelationInputObjectSchema, SystemSettingOrderByWithRelationInputObjectSchema.array()]).optional(), where: SystemSettingWhereInputObjectSchema.optional(), cursor: SystemSettingWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), SystemSettingCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.SystemSettingCountArgs>;

export const SystemSettingCountZodSchema = z.object({ orderBy: z.union([SystemSettingOrderByWithRelationInputObjectSchema, SystemSettingOrderByWithRelationInputObjectSchema.array()]).optional(), where: SystemSettingWhereInputObjectSchema.optional(), cursor: SystemSettingWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), SystemSettingCountAggregateInputObjectSchema ]).optional() }).strict();