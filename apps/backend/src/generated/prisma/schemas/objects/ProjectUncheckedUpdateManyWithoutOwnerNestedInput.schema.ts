import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectCreateWithoutOwnerInputObjectSchema as ProjectCreateWithoutOwnerInputObjectSchema } from './ProjectCreateWithoutOwnerInput.schema';
import { ProjectUncheckedCreateWithoutOwnerInputObjectSchema as ProjectUncheckedCreateWithoutOwnerInputObjectSchema } from './ProjectUncheckedCreateWithoutOwnerInput.schema';
import { ProjectCreateOrConnectWithoutOwnerInputObjectSchema as ProjectCreateOrConnectWithoutOwnerInputObjectSchema } from './ProjectCreateOrConnectWithoutOwnerInput.schema';
import { ProjectUpsertWithWhereUniqueWithoutOwnerInputObjectSchema as ProjectUpsertWithWhereUniqueWithoutOwnerInputObjectSchema } from './ProjectUpsertWithWhereUniqueWithoutOwnerInput.schema';
import { ProjectCreateManyOwnerInputEnvelopeObjectSchema as ProjectCreateManyOwnerInputEnvelopeObjectSchema } from './ProjectCreateManyOwnerInputEnvelope.schema';
import { ProjectWhereUniqueInputObjectSchema as ProjectWhereUniqueInputObjectSchema } from './ProjectWhereUniqueInput.schema';
import { ProjectUpdateWithWhereUniqueWithoutOwnerInputObjectSchema as ProjectUpdateWithWhereUniqueWithoutOwnerInputObjectSchema } from './ProjectUpdateWithWhereUniqueWithoutOwnerInput.schema';
import { ProjectUpdateManyWithWhereWithoutOwnerInputObjectSchema as ProjectUpdateManyWithWhereWithoutOwnerInputObjectSchema } from './ProjectUpdateManyWithWhereWithoutOwnerInput.schema';
import { ProjectScalarWhereInputObjectSchema as ProjectScalarWhereInputObjectSchema } from './ProjectScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProjectCreateWithoutOwnerInputObjectSchema), z.lazy(() => ProjectCreateWithoutOwnerInputObjectSchema).array(), z.lazy(() => ProjectUncheckedCreateWithoutOwnerInputObjectSchema), z.lazy(() => ProjectUncheckedCreateWithoutOwnerInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ProjectCreateOrConnectWithoutOwnerInputObjectSchema), z.lazy(() => ProjectCreateOrConnectWithoutOwnerInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ProjectUpsertWithWhereUniqueWithoutOwnerInputObjectSchema), z.lazy(() => ProjectUpsertWithWhereUniqueWithoutOwnerInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ProjectCreateManyOwnerInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ProjectWhereUniqueInputObjectSchema), z.lazy(() => ProjectWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ProjectWhereUniqueInputObjectSchema), z.lazy(() => ProjectWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ProjectWhereUniqueInputObjectSchema), z.lazy(() => ProjectWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ProjectWhereUniqueInputObjectSchema), z.lazy(() => ProjectWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ProjectUpdateWithWhereUniqueWithoutOwnerInputObjectSchema), z.lazy(() => ProjectUpdateWithWhereUniqueWithoutOwnerInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ProjectUpdateManyWithWhereWithoutOwnerInputObjectSchema), z.lazy(() => ProjectUpdateManyWithWhereWithoutOwnerInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ProjectScalarWhereInputObjectSchema), z.lazy(() => ProjectScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ProjectUncheckedUpdateManyWithoutOwnerNestedInputObjectSchema: z.ZodType<Prisma.ProjectUncheckedUpdateManyWithoutOwnerNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectUncheckedUpdateManyWithoutOwnerNestedInput>;
export const ProjectUncheckedUpdateManyWithoutOwnerNestedInputObjectZodSchema = makeSchema();
