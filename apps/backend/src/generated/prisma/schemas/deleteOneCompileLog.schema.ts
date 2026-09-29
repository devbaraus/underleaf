import type { Prisma } from '../browser';
import * as z from 'zod';
import { CompileLogSelectObjectSchema as CompileLogSelectObjectSchema } from './objects/CompileLogSelect.schema';
import { CompileLogIncludeObjectSchema as CompileLogIncludeObjectSchema } from './objects/CompileLogInclude.schema';
import { CompileLogWhereUniqueInputObjectSchema as CompileLogWhereUniqueInputObjectSchema } from './objects/CompileLogWhereUniqueInput.schema';

export const CompileLogDeleteOneSchema: z.ZodType<Prisma.CompileLogDeleteArgs> = z.object({ select: CompileLogSelectObjectSchema.optional(), include: CompileLogIncludeObjectSchema.optional(), where: CompileLogWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CompileLogDeleteArgs>;

export const CompileLogDeleteOneZodSchema = z.object({ select: CompileLogSelectObjectSchema.optional(), include: CompileLogIncludeObjectSchema.optional(), where: CompileLogWhereUniqueInputObjectSchema }).strict();