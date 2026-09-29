import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectCreateWithoutOwnerInputObjectSchema as ProjectCreateWithoutOwnerInputObjectSchema } from './ProjectCreateWithoutOwnerInput.schema';
import { ProjectUncheckedCreateWithoutOwnerInputObjectSchema as ProjectUncheckedCreateWithoutOwnerInputObjectSchema } from './ProjectUncheckedCreateWithoutOwnerInput.schema';
import { ProjectCreateOrConnectWithoutOwnerInputObjectSchema as ProjectCreateOrConnectWithoutOwnerInputObjectSchema } from './ProjectCreateOrConnectWithoutOwnerInput.schema';
import { ProjectCreateManyOwnerInputEnvelopeObjectSchema as ProjectCreateManyOwnerInputEnvelopeObjectSchema } from './ProjectCreateManyOwnerInputEnvelope.schema';
import { ProjectWhereUniqueInputObjectSchema as ProjectWhereUniqueInputObjectSchema } from './ProjectWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProjectCreateWithoutOwnerInputObjectSchema), z.lazy(() => ProjectCreateWithoutOwnerInputObjectSchema).array(), z.lazy(() => ProjectUncheckedCreateWithoutOwnerInputObjectSchema), z.lazy(() => ProjectUncheckedCreateWithoutOwnerInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ProjectCreateOrConnectWithoutOwnerInputObjectSchema), z.lazy(() => ProjectCreateOrConnectWithoutOwnerInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ProjectCreateManyOwnerInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ProjectWhereUniqueInputObjectSchema), z.lazy(() => ProjectWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ProjectCreateNestedManyWithoutOwnerInputObjectSchema: z.ZodType<Prisma.ProjectCreateNestedManyWithoutOwnerInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectCreateNestedManyWithoutOwnerInput>;
export const ProjectCreateNestedManyWithoutOwnerInputObjectZodSchema = makeSchema();
