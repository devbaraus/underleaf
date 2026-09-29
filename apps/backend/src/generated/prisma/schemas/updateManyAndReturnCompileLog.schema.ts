import type { Prisma } from '../browser';
import * as z from 'zod';
import { CompileLogSelectObjectSchema as CompileLogSelectObjectSchema } from './objects/CompileLogSelect.schema';
import { CompileLogUpdateManyMutationInputObjectSchema as CompileLogUpdateManyMutationInputObjectSchema } from './objects/CompileLogUpdateManyMutationInput.schema';
import { CompileLogWhereInputObjectSchema as CompileLogWhereInputObjectSchema } from './objects/CompileLogWhereInput.schema';

export const CompileLogUpdateManyAndReturnSchema: z.ZodType<Prisma.CompileLogUpdateManyAndReturnArgs> = z.object({ select: CompileLogSelectObjectSchema.optional(), data: CompileLogUpdateManyMutationInputObjectSchema, where: CompileLogWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CompileLogUpdateManyAndReturnArgs>;

export const CompileLogUpdateManyAndReturnZodSchema = z.object({ select: CompileLogSelectObjectSchema.optional(), data: CompileLogUpdateManyMutationInputObjectSchema, where: CompileLogWhereInputObjectSchema.optional() }).strict();