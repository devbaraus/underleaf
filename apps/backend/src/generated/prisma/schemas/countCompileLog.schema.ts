import type { Prisma } from '../browser';
import * as z from 'zod';
import { CompileLogOrderByWithRelationInputObjectSchema as CompileLogOrderByWithRelationInputObjectSchema } from './objects/CompileLogOrderByWithRelationInput.schema';
import { CompileLogWhereInputObjectSchema as CompileLogWhereInputObjectSchema } from './objects/CompileLogWhereInput.schema';
import { CompileLogWhereUniqueInputObjectSchema as CompileLogWhereUniqueInputObjectSchema } from './objects/CompileLogWhereUniqueInput.schema';
import { CompileLogCountAggregateInputObjectSchema as CompileLogCountAggregateInputObjectSchema } from './objects/CompileLogCountAggregateInput.schema';

export const CompileLogCountSchema: z.ZodType<Prisma.CompileLogCountArgs> = z.object({ orderBy: z.union([CompileLogOrderByWithRelationInputObjectSchema, CompileLogOrderByWithRelationInputObjectSchema.array()]).optional(), where: CompileLogWhereInputObjectSchema.optional(), cursor: CompileLogWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CompileLogCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.CompileLogCountArgs>;

export const CompileLogCountZodSchema = z.object({ orderBy: z.union([CompileLogOrderByWithRelationInputObjectSchema, CompileLogOrderByWithRelationInputObjectSchema.array()]).optional(), where: CompileLogWhereInputObjectSchema.optional(), cursor: CompileLogWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CompileLogCountAggregateInputObjectSchema ]).optional() }).strict();