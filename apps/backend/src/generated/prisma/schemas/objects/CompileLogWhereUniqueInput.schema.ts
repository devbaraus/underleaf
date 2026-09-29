import * as z from 'zod';
import type { Prisma } from '../../browser';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const CompileLogWhereUniqueInputObjectSchema: z.ZodType<Prisma.CompileLogWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CompileLogWhereUniqueInput>;
export const CompileLogWhereUniqueInputObjectZodSchema = makeSchema();
