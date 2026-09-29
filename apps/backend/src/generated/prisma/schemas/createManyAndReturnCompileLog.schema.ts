import type { Prisma } from '../browser';
import * as z from 'zod';
import { CompileLogSelectObjectSchema as CompileLogSelectObjectSchema } from './objects/CompileLogSelect.schema';
import { CompileLogCreateManyInputObjectSchema as CompileLogCreateManyInputObjectSchema } from './objects/CompileLogCreateManyInput.schema';

export const CompileLogCreateManyAndReturnSchema: z.ZodType<Prisma.CompileLogCreateManyAndReturnArgs> = z.object({ select: CompileLogSelectObjectSchema.optional(), data: z.union([ CompileLogCreateManyInputObjectSchema, z.array(CompileLogCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CompileLogCreateManyAndReturnArgs>;

export const CompileLogCreateManyAndReturnZodSchema = z.object({ select: CompileLogSelectObjectSchema.optional(), data: z.union([ CompileLogCreateManyInputObjectSchema, z.array(CompileLogCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();