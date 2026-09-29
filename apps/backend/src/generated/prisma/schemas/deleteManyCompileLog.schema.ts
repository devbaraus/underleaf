import type { Prisma } from '../browser';
import * as z from 'zod';
import { CompileLogWhereInputObjectSchema as CompileLogWhereInputObjectSchema } from './objects/CompileLogWhereInput.schema';

export const CompileLogDeleteManySchema: z.ZodType<Prisma.CompileLogDeleteManyArgs> = z.object({ where: CompileLogWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CompileLogDeleteManyArgs>;

export const CompileLogDeleteManyZodSchema = z.object({ where: CompileLogWhereInputObjectSchema.optional() }).strict();