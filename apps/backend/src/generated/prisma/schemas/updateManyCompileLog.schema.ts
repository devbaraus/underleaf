import type { Prisma } from '../browser';
import * as z from 'zod';
import { CompileLogUpdateManyMutationInputObjectSchema as CompileLogUpdateManyMutationInputObjectSchema } from './objects/CompileLogUpdateManyMutationInput.schema';
import { CompileLogWhereInputObjectSchema as CompileLogWhereInputObjectSchema } from './objects/CompileLogWhereInput.schema';

export const CompileLogUpdateManySchema: z.ZodType<Prisma.CompileLogUpdateManyArgs> = z.object({ data: CompileLogUpdateManyMutationInputObjectSchema, where: CompileLogWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CompileLogUpdateManyArgs>;

export const CompileLogUpdateManyZodSchema = z.object({ data: CompileLogUpdateManyMutationInputObjectSchema, where: CompileLogWhereInputObjectSchema.optional() }).strict();