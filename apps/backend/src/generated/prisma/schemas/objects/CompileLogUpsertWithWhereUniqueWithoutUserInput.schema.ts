import * as z from 'zod';
import type { Prisma } from '../../browser';
import { CompileLogWhereUniqueInputObjectSchema as CompileLogWhereUniqueInputObjectSchema } from './CompileLogWhereUniqueInput.schema';
import { CompileLogUpdateWithoutUserInputObjectSchema as CompileLogUpdateWithoutUserInputObjectSchema } from './CompileLogUpdateWithoutUserInput.schema';
import { CompileLogUncheckedUpdateWithoutUserInputObjectSchema as CompileLogUncheckedUpdateWithoutUserInputObjectSchema } from './CompileLogUncheckedUpdateWithoutUserInput.schema';
import { CompileLogCreateWithoutUserInputObjectSchema as CompileLogCreateWithoutUserInputObjectSchema } from './CompileLogCreateWithoutUserInput.schema';
import { CompileLogUncheckedCreateWithoutUserInputObjectSchema as CompileLogUncheckedCreateWithoutUserInputObjectSchema } from './CompileLogUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CompileLogWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CompileLogUpdateWithoutUserInputObjectSchema), z.lazy(() => CompileLogUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => CompileLogCreateWithoutUserInputObjectSchema), z.lazy(() => CompileLogUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const CompileLogUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.CompileLogUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CompileLogUpsertWithWhereUniqueWithoutUserInput>;
export const CompileLogUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
