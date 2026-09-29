import * as z from 'zod';
import type { Prisma } from '../../browser';
import { CompileLogWhereUniqueInputObjectSchema as CompileLogWhereUniqueInputObjectSchema } from './CompileLogWhereUniqueInput.schema';
import { CompileLogCreateWithoutProjectInputObjectSchema as CompileLogCreateWithoutProjectInputObjectSchema } from './CompileLogCreateWithoutProjectInput.schema';
import { CompileLogUncheckedCreateWithoutProjectInputObjectSchema as CompileLogUncheckedCreateWithoutProjectInputObjectSchema } from './CompileLogUncheckedCreateWithoutProjectInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CompileLogWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CompileLogCreateWithoutProjectInputObjectSchema), z.lazy(() => CompileLogUncheckedCreateWithoutProjectInputObjectSchema)])
}).strict();
export const CompileLogCreateOrConnectWithoutProjectInputObjectSchema: z.ZodType<Prisma.CompileLogCreateOrConnectWithoutProjectInput> = makeSchema() as unknown as z.ZodType<Prisma.CompileLogCreateOrConnectWithoutProjectInput>;
export const CompileLogCreateOrConnectWithoutProjectInputObjectZodSchema = makeSchema();
