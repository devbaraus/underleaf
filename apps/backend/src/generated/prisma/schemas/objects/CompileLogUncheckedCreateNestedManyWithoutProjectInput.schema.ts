import * as z from 'zod';
import type { Prisma } from '../../browser';
import { CompileLogCreateWithoutProjectInputObjectSchema as CompileLogCreateWithoutProjectInputObjectSchema } from './CompileLogCreateWithoutProjectInput.schema';
import { CompileLogUncheckedCreateWithoutProjectInputObjectSchema as CompileLogUncheckedCreateWithoutProjectInputObjectSchema } from './CompileLogUncheckedCreateWithoutProjectInput.schema';
import { CompileLogCreateOrConnectWithoutProjectInputObjectSchema as CompileLogCreateOrConnectWithoutProjectInputObjectSchema } from './CompileLogCreateOrConnectWithoutProjectInput.schema';
import { CompileLogCreateManyProjectInputEnvelopeObjectSchema as CompileLogCreateManyProjectInputEnvelopeObjectSchema } from './CompileLogCreateManyProjectInputEnvelope.schema';
import { CompileLogWhereUniqueInputObjectSchema as CompileLogWhereUniqueInputObjectSchema } from './CompileLogWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CompileLogCreateWithoutProjectInputObjectSchema), z.lazy(() => CompileLogCreateWithoutProjectInputObjectSchema).array(), z.lazy(() => CompileLogUncheckedCreateWithoutProjectInputObjectSchema), z.lazy(() => CompileLogUncheckedCreateWithoutProjectInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CompileLogCreateOrConnectWithoutProjectInputObjectSchema), z.lazy(() => CompileLogCreateOrConnectWithoutProjectInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CompileLogCreateManyProjectInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CompileLogWhereUniqueInputObjectSchema), z.lazy(() => CompileLogWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CompileLogUncheckedCreateNestedManyWithoutProjectInputObjectSchema: z.ZodType<Prisma.CompileLogUncheckedCreateNestedManyWithoutProjectInput> = makeSchema() as unknown as z.ZodType<Prisma.CompileLogUncheckedCreateNestedManyWithoutProjectInput>;
export const CompileLogUncheckedCreateNestedManyWithoutProjectInputObjectZodSchema = makeSchema();
