import * as z from 'zod';
import type { Prisma } from '../../browser';
import { CompileLogCreateManyUserInputObjectSchema as CompileLogCreateManyUserInputObjectSchema } from './CompileLogCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CompileLogCreateManyUserInputObjectSchema), z.lazy(() => CompileLogCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CompileLogCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.CompileLogCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CompileLogCreateManyUserInputEnvelope>;
export const CompileLogCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
