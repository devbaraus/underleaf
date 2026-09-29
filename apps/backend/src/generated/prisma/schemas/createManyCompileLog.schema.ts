import type { Prisma } from '../browser';
import * as z from 'zod';
import { CompileLogCreateManyInputObjectSchema as CompileLogCreateManyInputObjectSchema } from './objects/CompileLogCreateManyInput.schema';

export const CompileLogCreateManySchema: z.ZodType<Prisma.CompileLogCreateManyArgs> = z.object({ data: z.union([ CompileLogCreateManyInputObjectSchema, z.array(CompileLogCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CompileLogCreateManyArgs>;

export const CompileLogCreateManyZodSchema = z.object({ data: z.union([ CompileLogCreateManyInputObjectSchema, z.array(CompileLogCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();