import * as z from 'zod';
import type { Prisma } from '../../browser';
import { CompileLogCreateWithoutUserInputObjectSchema as CompileLogCreateWithoutUserInputObjectSchema } from './CompileLogCreateWithoutUserInput.schema';
import { CompileLogUncheckedCreateWithoutUserInputObjectSchema as CompileLogUncheckedCreateWithoutUserInputObjectSchema } from './CompileLogUncheckedCreateWithoutUserInput.schema';
import { CompileLogCreateOrConnectWithoutUserInputObjectSchema as CompileLogCreateOrConnectWithoutUserInputObjectSchema } from './CompileLogCreateOrConnectWithoutUserInput.schema';
import { CompileLogUpsertWithWhereUniqueWithoutUserInputObjectSchema as CompileLogUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './CompileLogUpsertWithWhereUniqueWithoutUserInput.schema';
import { CompileLogCreateManyUserInputEnvelopeObjectSchema as CompileLogCreateManyUserInputEnvelopeObjectSchema } from './CompileLogCreateManyUserInputEnvelope.schema';
import { CompileLogWhereUniqueInputObjectSchema as CompileLogWhereUniqueInputObjectSchema } from './CompileLogWhereUniqueInput.schema';
import { CompileLogUpdateWithWhereUniqueWithoutUserInputObjectSchema as CompileLogUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './CompileLogUpdateWithWhereUniqueWithoutUserInput.schema';
import { CompileLogUpdateManyWithWhereWithoutUserInputObjectSchema as CompileLogUpdateManyWithWhereWithoutUserInputObjectSchema } from './CompileLogUpdateManyWithWhereWithoutUserInput.schema';
import { CompileLogScalarWhereInputObjectSchema as CompileLogScalarWhereInputObjectSchema } from './CompileLogScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CompileLogCreateWithoutUserInputObjectSchema), z.lazy(() => CompileLogCreateWithoutUserInputObjectSchema).array(), z.lazy(() => CompileLogUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => CompileLogUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CompileLogCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => CompileLogCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CompileLogUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => CompileLogUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CompileLogCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CompileLogWhereUniqueInputObjectSchema), z.lazy(() => CompileLogWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CompileLogWhereUniqueInputObjectSchema), z.lazy(() => CompileLogWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CompileLogWhereUniqueInputObjectSchema), z.lazy(() => CompileLogWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CompileLogWhereUniqueInputObjectSchema), z.lazy(() => CompileLogWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CompileLogUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => CompileLogUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CompileLogUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => CompileLogUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CompileLogScalarWhereInputObjectSchema), z.lazy(() => CompileLogScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CompileLogUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.CompileLogUncheckedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CompileLogUncheckedUpdateManyWithoutUserNestedInput>;
export const CompileLogUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
