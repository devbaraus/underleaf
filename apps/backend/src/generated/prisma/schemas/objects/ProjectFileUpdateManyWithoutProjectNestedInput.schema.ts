import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectFileCreateWithoutProjectInputObjectSchema as ProjectFileCreateWithoutProjectInputObjectSchema } from './ProjectFileCreateWithoutProjectInput.schema';
import { ProjectFileUncheckedCreateWithoutProjectInputObjectSchema as ProjectFileUncheckedCreateWithoutProjectInputObjectSchema } from './ProjectFileUncheckedCreateWithoutProjectInput.schema';
import { ProjectFileCreateOrConnectWithoutProjectInputObjectSchema as ProjectFileCreateOrConnectWithoutProjectInputObjectSchema } from './ProjectFileCreateOrConnectWithoutProjectInput.schema';
import { ProjectFileUpsertWithWhereUniqueWithoutProjectInputObjectSchema as ProjectFileUpsertWithWhereUniqueWithoutProjectInputObjectSchema } from './ProjectFileUpsertWithWhereUniqueWithoutProjectInput.schema';
import { ProjectFileCreateManyProjectInputEnvelopeObjectSchema as ProjectFileCreateManyProjectInputEnvelopeObjectSchema } from './ProjectFileCreateManyProjectInputEnvelope.schema';
import { ProjectFileWhereUniqueInputObjectSchema as ProjectFileWhereUniqueInputObjectSchema } from './ProjectFileWhereUniqueInput.schema';
import { ProjectFileUpdateWithWhereUniqueWithoutProjectInputObjectSchema as ProjectFileUpdateWithWhereUniqueWithoutProjectInputObjectSchema } from './ProjectFileUpdateWithWhereUniqueWithoutProjectInput.schema';
import { ProjectFileUpdateManyWithWhereWithoutProjectInputObjectSchema as ProjectFileUpdateManyWithWhereWithoutProjectInputObjectSchema } from './ProjectFileUpdateManyWithWhereWithoutProjectInput.schema';
import { ProjectFileScalarWhereInputObjectSchema as ProjectFileScalarWhereInputObjectSchema } from './ProjectFileScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProjectFileCreateWithoutProjectInputObjectSchema), z.lazy(() => ProjectFileCreateWithoutProjectInputObjectSchema).array(), z.lazy(() => ProjectFileUncheckedCreateWithoutProjectInputObjectSchema), z.lazy(() => ProjectFileUncheckedCreateWithoutProjectInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ProjectFileCreateOrConnectWithoutProjectInputObjectSchema), z.lazy(() => ProjectFileCreateOrConnectWithoutProjectInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ProjectFileUpsertWithWhereUniqueWithoutProjectInputObjectSchema), z.lazy(() => ProjectFileUpsertWithWhereUniqueWithoutProjectInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ProjectFileCreateManyProjectInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ProjectFileWhereUniqueInputObjectSchema), z.lazy(() => ProjectFileWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ProjectFileWhereUniqueInputObjectSchema), z.lazy(() => ProjectFileWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ProjectFileWhereUniqueInputObjectSchema), z.lazy(() => ProjectFileWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ProjectFileWhereUniqueInputObjectSchema), z.lazy(() => ProjectFileWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ProjectFileUpdateWithWhereUniqueWithoutProjectInputObjectSchema), z.lazy(() => ProjectFileUpdateWithWhereUniqueWithoutProjectInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ProjectFileUpdateManyWithWhereWithoutProjectInputObjectSchema), z.lazy(() => ProjectFileUpdateManyWithWhereWithoutProjectInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ProjectFileScalarWhereInputObjectSchema), z.lazy(() => ProjectFileScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ProjectFileUpdateManyWithoutProjectNestedInputObjectSchema: z.ZodType<Prisma.ProjectFileUpdateManyWithoutProjectNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectFileUpdateManyWithoutProjectNestedInput>;
export const ProjectFileUpdateManyWithoutProjectNestedInputObjectZodSchema = makeSchema();
