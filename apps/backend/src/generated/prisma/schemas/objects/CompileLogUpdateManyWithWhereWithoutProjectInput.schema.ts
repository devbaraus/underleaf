import * as z from 'zod';
import type { Prisma } from '../../browser';
import { CompileLogScalarWhereInputObjectSchema as CompileLogScalarWhereInputObjectSchema } from './CompileLogScalarWhereInput.schema';
import { CompileLogUpdateManyMutationInputObjectSchema as CompileLogUpdateManyMutationInputObjectSchema } from './CompileLogUpdateManyMutationInput.schema';
import { CompileLogUncheckedUpdateManyWithoutProjectInputObjectSchema as CompileLogUncheckedUpdateManyWithoutProjectInputObjectSchema } from './CompileLogUncheckedUpdateManyWithoutProjectInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CompileLogScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CompileLogUpdateManyMutationInputObjectSchema), z.lazy(() => CompileLogUncheckedUpdateManyWithoutProjectInputObjectSchema)])
}).strict();
export const CompileLogUpdateManyWithWhereWithoutProjectInputObjectSchema: z.ZodType<Prisma.CompileLogUpdateManyWithWhereWithoutProjectInput> = makeSchema() as unknown as z.ZodType<Prisma.CompileLogUpdateManyWithWhereWithoutProjectInput>;
export const CompileLogUpdateManyWithWhereWithoutProjectInputObjectZodSchema = makeSchema();
