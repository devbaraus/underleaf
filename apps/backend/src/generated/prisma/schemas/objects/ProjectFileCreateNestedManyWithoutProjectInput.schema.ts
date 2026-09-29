import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectFileCreateWithoutProjectInputObjectSchema as ProjectFileCreateWithoutProjectInputObjectSchema } from './ProjectFileCreateWithoutProjectInput.schema';
import { ProjectFileUncheckedCreateWithoutProjectInputObjectSchema as ProjectFileUncheckedCreateWithoutProjectInputObjectSchema } from './ProjectFileUncheckedCreateWithoutProjectInput.schema';
import { ProjectFileCreateOrConnectWithoutProjectInputObjectSchema as ProjectFileCreateOrConnectWithoutProjectInputObjectSchema } from './ProjectFileCreateOrConnectWithoutProjectInput.schema';
import { ProjectFileCreateManyProjectInputEnvelopeObjectSchema as ProjectFileCreateManyProjectInputEnvelopeObjectSchema } from './ProjectFileCreateManyProjectInputEnvelope.schema';
import { ProjectFileWhereUniqueInputObjectSchema as ProjectFileWhereUniqueInputObjectSchema } from './ProjectFileWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProjectFileCreateWithoutProjectInputObjectSchema), z.lazy(() => ProjectFileCreateWithoutProjectInputObjectSchema).array(), z.lazy(() => ProjectFileUncheckedCreateWithoutProjectInputObjectSchema), z.lazy(() => ProjectFileUncheckedCreateWithoutProjectInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ProjectFileCreateOrConnectWithoutProjectInputObjectSchema), z.lazy(() => ProjectFileCreateOrConnectWithoutProjectInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ProjectFileCreateManyProjectInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ProjectFileWhereUniqueInputObjectSchema), z.lazy(() => ProjectFileWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ProjectFileCreateNestedManyWithoutProjectInputObjectSchema: z.ZodType<Prisma.ProjectFileCreateNestedManyWithoutProjectInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectFileCreateNestedManyWithoutProjectInput>;
export const ProjectFileCreateNestedManyWithoutProjectInputObjectZodSchema = makeSchema();
