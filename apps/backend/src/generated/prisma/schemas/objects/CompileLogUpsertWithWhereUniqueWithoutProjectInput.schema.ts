import * as z from 'zod';
import type { Prisma } from '../../browser';
import { CompileLogWhereUniqueInputObjectSchema as CompileLogWhereUniqueInputObjectSchema } from './CompileLogWhereUniqueInput.schema';
import { CompileLogUpdateWithoutProjectInputObjectSchema as CompileLogUpdateWithoutProjectInputObjectSchema } from './CompileLogUpdateWithoutProjectInput.schema';
import { CompileLogUncheckedUpdateWithoutProjectInputObjectSchema as CompileLogUncheckedUpdateWithoutProjectInputObjectSchema } from './CompileLogUncheckedUpdateWithoutProjectInput.schema';
import { CompileLogCreateWithoutProjectInputObjectSchema as CompileLogCreateWithoutProjectInputObjectSchema } from './CompileLogCreateWithoutProjectInput.schema';
import { CompileLogUncheckedCreateWithoutProjectInputObjectSchema as CompileLogUncheckedCreateWithoutProjectInputObjectSchema } from './CompileLogUncheckedCreateWithoutProjectInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CompileLogWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CompileLogUpdateWithoutProjectInputObjectSchema), z.lazy(() => CompileLogUncheckedUpdateWithoutProjectInputObjectSchema)]),
  create: z.union([z.lazy(() => CompileLogCreateWithoutProjectInputObjectSchema), z.lazy(() => CompileLogUncheckedCreateWithoutProjectInputObjectSchema)])
}).strict();
export const CompileLogUpsertWithWhereUniqueWithoutProjectInputObjectSchema: z.ZodType<Prisma.CompileLogUpsertWithWhereUniqueWithoutProjectInput> = makeSchema() as unknown as z.ZodType<Prisma.CompileLogUpsertWithWhereUniqueWithoutProjectInput>;
export const CompileLogUpsertWithWhereUniqueWithoutProjectInputObjectZodSchema = makeSchema();
