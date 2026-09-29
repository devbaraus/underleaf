import * as z from 'zod';
import type { Prisma } from '../../browser';
import { CompileLogCreateManyProjectInputObjectSchema as CompileLogCreateManyProjectInputObjectSchema } from './CompileLogCreateManyProjectInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CompileLogCreateManyProjectInputObjectSchema), z.lazy(() => CompileLogCreateManyProjectInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CompileLogCreateManyProjectInputEnvelopeObjectSchema: z.ZodType<Prisma.CompileLogCreateManyProjectInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CompileLogCreateManyProjectInputEnvelope>;
export const CompileLogCreateManyProjectInputEnvelopeObjectZodSchema = makeSchema();
