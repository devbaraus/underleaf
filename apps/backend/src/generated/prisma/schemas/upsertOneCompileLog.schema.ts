import type { Prisma } from '../browser';
import * as z from 'zod';
import { CompileLogSelectObjectSchema as CompileLogSelectObjectSchema } from './objects/CompileLogSelect.schema';
import { CompileLogIncludeObjectSchema as CompileLogIncludeObjectSchema } from './objects/CompileLogInclude.schema';
import { CompileLogWhereUniqueInputObjectSchema as CompileLogWhereUniqueInputObjectSchema } from './objects/CompileLogWhereUniqueInput.schema';
import { CompileLogCreateInputObjectSchema as CompileLogCreateInputObjectSchema } from './objects/CompileLogCreateInput.schema';
import { CompileLogUncheckedCreateInputObjectSchema as CompileLogUncheckedCreateInputObjectSchema } from './objects/CompileLogUncheckedCreateInput.schema';
import { CompileLogUpdateInputObjectSchema as CompileLogUpdateInputObjectSchema } from './objects/CompileLogUpdateInput.schema';
import { CompileLogUncheckedUpdateInputObjectSchema as CompileLogUncheckedUpdateInputObjectSchema } from './objects/CompileLogUncheckedUpdateInput.schema';

export const CompileLogUpsertOneSchema: z.ZodType<Prisma.CompileLogUpsertArgs> = z.object({ select: CompileLogSelectObjectSchema.optional(), include: CompileLogIncludeObjectSchema.optional(), where: CompileLogWhereUniqueInputObjectSchema, create: z.union([ CompileLogCreateInputObjectSchema, CompileLogUncheckedCreateInputObjectSchema ]), update: z.union([ CompileLogUpdateInputObjectSchema, CompileLogUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.CompileLogUpsertArgs>;

export const CompileLogUpsertOneZodSchema = z.object({ select: CompileLogSelectObjectSchema.optional(), include: CompileLogIncludeObjectSchema.optional(), where: CompileLogWhereUniqueInputObjectSchema, create: z.union([ CompileLogCreateInputObjectSchema, CompileLogUncheckedCreateInputObjectSchema ]), update: z.union([ CompileLogUpdateInputObjectSchema, CompileLogUncheckedUpdateInputObjectSchema ]) }).strict();