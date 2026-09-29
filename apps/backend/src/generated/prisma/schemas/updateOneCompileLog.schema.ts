import type { Prisma } from '../browser';
import * as z from 'zod';
import { CompileLogSelectObjectSchema as CompileLogSelectObjectSchema } from './objects/CompileLogSelect.schema';
import { CompileLogIncludeObjectSchema as CompileLogIncludeObjectSchema } from './objects/CompileLogInclude.schema';
import { CompileLogUpdateInputObjectSchema as CompileLogUpdateInputObjectSchema } from './objects/CompileLogUpdateInput.schema';
import { CompileLogUncheckedUpdateInputObjectSchema as CompileLogUncheckedUpdateInputObjectSchema } from './objects/CompileLogUncheckedUpdateInput.schema';
import { CompileLogWhereUniqueInputObjectSchema as CompileLogWhereUniqueInputObjectSchema } from './objects/CompileLogWhereUniqueInput.schema';

export const CompileLogUpdateOneSchema: z.ZodType<Prisma.CompileLogUpdateArgs> = z.object({ select: CompileLogSelectObjectSchema.optional(), include: CompileLogIncludeObjectSchema.optional(), data: z.union([CompileLogUpdateInputObjectSchema, CompileLogUncheckedUpdateInputObjectSchema]), where: CompileLogWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CompileLogUpdateArgs>;

export const CompileLogUpdateOneZodSchema = z.object({ select: CompileLogSelectObjectSchema.optional(), include: CompileLogIncludeObjectSchema.optional(), data: z.union([CompileLogUpdateInputObjectSchema, CompileLogUncheckedUpdateInputObjectSchema]), where: CompileLogWhereUniqueInputObjectSchema }).strict();