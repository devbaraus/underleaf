import * as z from 'zod';
import type { Prisma } from '../../browser';
import { CompileLogWhereUniqueInputObjectSchema as CompileLogWhereUniqueInputObjectSchema } from './CompileLogWhereUniqueInput.schema';
import { CompileLogUpdateWithoutProjectInputObjectSchema as CompileLogUpdateWithoutProjectInputObjectSchema } from './CompileLogUpdateWithoutProjectInput.schema';
import { CompileLogUncheckedUpdateWithoutProjectInputObjectSchema as CompileLogUncheckedUpdateWithoutProjectInputObjectSchema } from './CompileLogUncheckedUpdateWithoutProjectInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CompileLogWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CompileLogUpdateWithoutProjectInputObjectSchema), z.lazy(() => CompileLogUncheckedUpdateWithoutProjectInputObjectSchema)])
}).strict();
export const CompileLogUpdateWithWhereUniqueWithoutProjectInputObjectSchema: z.ZodType<Prisma.CompileLogUpdateWithWhereUniqueWithoutProjectInput> = makeSchema() as unknown as z.ZodType<Prisma.CompileLogUpdateWithWhereUniqueWithoutProjectInput>;
export const CompileLogUpdateWithWhereUniqueWithoutProjectInputObjectZodSchema = makeSchema();
