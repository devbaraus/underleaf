import type { Prisma } from '../browser';
import * as z from 'zod';
import { CompileLogSelectObjectSchema as CompileLogSelectObjectSchema } from './objects/CompileLogSelect.schema';
import { CompileLogIncludeObjectSchema as CompileLogIncludeObjectSchema } from './objects/CompileLogInclude.schema';
import { CompileLogCreateInputObjectSchema as CompileLogCreateInputObjectSchema } from './objects/CompileLogCreateInput.schema';
import { CompileLogUncheckedCreateInputObjectSchema as CompileLogUncheckedCreateInputObjectSchema } from './objects/CompileLogUncheckedCreateInput.schema';

export const CompileLogCreateOneSchema: z.ZodType<Prisma.CompileLogCreateArgs> = z.object({ select: CompileLogSelectObjectSchema.optional(), include: CompileLogIncludeObjectSchema.optional(), data: z.union([CompileLogCreateInputObjectSchema, CompileLogUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.CompileLogCreateArgs>;

export const CompileLogCreateOneZodSchema = z.object({ select: CompileLogSelectObjectSchema.optional(), include: CompileLogIncludeObjectSchema.optional(), data: z.union([CompileLogCreateInputObjectSchema, CompileLogUncheckedCreateInputObjectSchema]) }).strict();