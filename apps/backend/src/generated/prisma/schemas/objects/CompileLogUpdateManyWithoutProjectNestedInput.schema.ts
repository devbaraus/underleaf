import * as z from 'zod';
import type { Prisma } from '../../browser';
import { CompileLogCreateWithoutProjectInputObjectSchema as CompileLogCreateWithoutProjectInputObjectSchema } from './CompileLogCreateWithoutProjectInput.schema';
import { CompileLogUncheckedCreateWithoutProjectInputObjectSchema as CompileLogUncheckedCreateWithoutProjectInputObjectSchema } from './CompileLogUncheckedCreateWithoutProjectInput.schema';
import { CompileLogCreateOrConnectWithoutProjectInputObjectSchema as CompileLogCreateOrConnectWithoutProjectInputObjectSchema } from './CompileLogCreateOrConnectWithoutProjectInput.schema';
import { CompileLogUpsertWithWhereUniqueWithoutProjectInputObjectSchema as CompileLogUpsertWithWhereUniqueWithoutProjectInputObjectSchema } from './CompileLogUpsertWithWhereUniqueWithoutProjectInput.schema';
import { CompileLogCreateManyProjectInputEnvelopeObjectSchema as CompileLogCreateManyProjectInputEnvelopeObjectSchema } from './CompileLogCreateManyProjectInputEnvelope.schema';
import { CompileLogWhereUniqueInputObjectSchema as CompileLogWhereUniqueInputObjectSchema } from './CompileLogWhereUniqueInput.schema';
import { CompileLogUpdateWithWhereUniqueWithoutProjectInputObjectSchema as CompileLogUpdateWithWhereUniqueWithoutProjectInputObjectSchema } from './CompileLogUpdateWithWhereUniqueWithoutProjectInput.schema';
import { CompileLogUpdateManyWithWhereWithoutProjectInputObjectSchema as CompileLogUpdateManyWithWhereWithoutProjectInputObjectSchema } from './CompileLogUpdateManyWithWhereWithoutProjectInput.schema';
import { CompileLogScalarWhereInputObjectSchema as CompileLogScalarWhereInputObjectSchema } from './CompileLogScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CompileLogCreateWithoutProjectInputObjectSchema), z.lazy(() => CompileLogCreateWithoutProjectInputObjectSchema).array(), z.lazy(() => CompileLogUncheckedCreateWithoutProjectInputObjectSchema), z.lazy(() => CompileLogUncheckedCreateWithoutProjectInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CompileLogCreateOrConnectWithoutProjectInputObjectSchema), z.lazy(() => CompileLogCreateOrConnectWithoutProjectInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CompileLogUpsertWithWhereUniqueWithoutProjectInputObjectSchema), z.lazy(() => CompileLogUpsertWithWhereUniqueWithoutProjectInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CompileLogCreateManyProjectInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CompileLogWhereUniqueInputObjectSchema), z.lazy(() => CompileLogWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CompileLogWhereUniqueInputObjectSchema), z.lazy(() => CompileLogWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CompileLogWhereUniqueInputObjectSchema), z.lazy(() => CompileLogWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CompileLogWhereUniqueInputObjectSchema), z.lazy(() => CompileLogWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CompileLogUpdateWithWhereUniqueWithoutProjectInputObjectSchema), z.lazy(() => CompileLogUpdateWithWhereUniqueWithoutProjectInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CompileLogUpdateManyWithWhereWithoutProjectInputObjectSchema), z.lazy(() => CompileLogUpdateManyWithWhereWithoutProjectInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CompileLogScalarWhereInputObjectSchema), z.lazy(() => CompileLogScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CompileLogUpdateManyWithoutProjectNestedInputObjectSchema: z.ZodType<Prisma.CompileLogUpdateManyWithoutProjectNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CompileLogUpdateManyWithoutProjectNestedInput>;
export const CompileLogUpdateManyWithoutProjectNestedInputObjectZodSchema = makeSchema();
