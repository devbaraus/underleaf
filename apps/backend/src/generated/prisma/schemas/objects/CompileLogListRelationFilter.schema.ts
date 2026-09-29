import * as z from 'zod';
import type { Prisma } from '../../browser';
import { CompileLogWhereInputObjectSchema as CompileLogWhereInputObjectSchema } from './CompileLogWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => CompileLogWhereInputObjectSchema).optional(),
  some: z.lazy(() => CompileLogWhereInputObjectSchema).optional(),
  none: z.lazy(() => CompileLogWhereInputObjectSchema).optional()
}).strict();
export const CompileLogListRelationFilterObjectSchema: z.ZodType<Prisma.CompileLogListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CompileLogListRelationFilter>;
export const CompileLogListRelationFilterObjectZodSchema = makeSchema();
