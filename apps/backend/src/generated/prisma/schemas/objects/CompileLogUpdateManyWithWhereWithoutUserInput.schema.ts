import * as z from 'zod';
import type { Prisma } from '../../browser';
import { CompileLogScalarWhereInputObjectSchema as CompileLogScalarWhereInputObjectSchema } from './CompileLogScalarWhereInput.schema';
import { CompileLogUpdateManyMutationInputObjectSchema as CompileLogUpdateManyMutationInputObjectSchema } from './CompileLogUpdateManyMutationInput.schema';
import { CompileLogUncheckedUpdateManyWithoutUserInputObjectSchema as CompileLogUncheckedUpdateManyWithoutUserInputObjectSchema } from './CompileLogUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CompileLogScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CompileLogUpdateManyMutationInputObjectSchema), z.lazy(() => CompileLogUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const CompileLogUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.CompileLogUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CompileLogUpdateManyWithWhereWithoutUserInput>;
export const CompileLogUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
