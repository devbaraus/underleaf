import * as z from 'zod';
import type { Prisma } from '../../browser';
import { CompileLogCreateWithoutUserInputObjectSchema as CompileLogCreateWithoutUserInputObjectSchema } from './CompileLogCreateWithoutUserInput.schema';
import { CompileLogUncheckedCreateWithoutUserInputObjectSchema as CompileLogUncheckedCreateWithoutUserInputObjectSchema } from './CompileLogUncheckedCreateWithoutUserInput.schema';
import { CompileLogCreateOrConnectWithoutUserInputObjectSchema as CompileLogCreateOrConnectWithoutUserInputObjectSchema } from './CompileLogCreateOrConnectWithoutUserInput.schema';
import { CompileLogCreateManyUserInputEnvelopeObjectSchema as CompileLogCreateManyUserInputEnvelopeObjectSchema } from './CompileLogCreateManyUserInputEnvelope.schema';
import { CompileLogWhereUniqueInputObjectSchema as CompileLogWhereUniqueInputObjectSchema } from './CompileLogWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CompileLogCreateWithoutUserInputObjectSchema), z.lazy(() => CompileLogCreateWithoutUserInputObjectSchema).array(), z.lazy(() => CompileLogUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => CompileLogUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CompileLogCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => CompileLogCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CompileLogCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CompileLogWhereUniqueInputObjectSchema), z.lazy(() => CompileLogWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CompileLogCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.CompileLogCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CompileLogCreateNestedManyWithoutUserInput>;
export const CompileLogCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
