import * as z from 'zod';
import type { Prisma } from '../../browser';
import { CompileLogWhereUniqueInputObjectSchema as CompileLogWhereUniqueInputObjectSchema } from './CompileLogWhereUniqueInput.schema';
import { CompileLogCreateWithoutUserInputObjectSchema as CompileLogCreateWithoutUserInputObjectSchema } from './CompileLogCreateWithoutUserInput.schema';
import { CompileLogUncheckedCreateWithoutUserInputObjectSchema as CompileLogUncheckedCreateWithoutUserInputObjectSchema } from './CompileLogUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CompileLogWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CompileLogCreateWithoutUserInputObjectSchema), z.lazy(() => CompileLogUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const CompileLogCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.CompileLogCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CompileLogCreateOrConnectWithoutUserInput>;
export const CompileLogCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
