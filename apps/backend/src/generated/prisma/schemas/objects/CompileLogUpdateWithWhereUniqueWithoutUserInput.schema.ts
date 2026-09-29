import * as z from 'zod';
import type { Prisma } from '../../browser';
import { CompileLogWhereUniqueInputObjectSchema as CompileLogWhereUniqueInputObjectSchema } from './CompileLogWhereUniqueInput.schema';
import { CompileLogUpdateWithoutUserInputObjectSchema as CompileLogUpdateWithoutUserInputObjectSchema } from './CompileLogUpdateWithoutUserInput.schema';
import { CompileLogUncheckedUpdateWithoutUserInputObjectSchema as CompileLogUncheckedUpdateWithoutUserInputObjectSchema } from './CompileLogUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CompileLogWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CompileLogUpdateWithoutUserInputObjectSchema), z.lazy(() => CompileLogUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const CompileLogUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.CompileLogUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CompileLogUpdateWithWhereUniqueWithoutUserInput>;
export const CompileLogUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
