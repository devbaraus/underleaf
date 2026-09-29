import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectWhereUniqueInputObjectSchema as ProjectWhereUniqueInputObjectSchema } from './ProjectWhereUniqueInput.schema';
import { ProjectCreateWithoutOwnerInputObjectSchema as ProjectCreateWithoutOwnerInputObjectSchema } from './ProjectCreateWithoutOwnerInput.schema';
import { ProjectUncheckedCreateWithoutOwnerInputObjectSchema as ProjectUncheckedCreateWithoutOwnerInputObjectSchema } from './ProjectUncheckedCreateWithoutOwnerInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProjectWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ProjectCreateWithoutOwnerInputObjectSchema), z.lazy(() => ProjectUncheckedCreateWithoutOwnerInputObjectSchema)])
}).strict();
export const ProjectCreateOrConnectWithoutOwnerInputObjectSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutOwnerInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectCreateOrConnectWithoutOwnerInput>;
export const ProjectCreateOrConnectWithoutOwnerInputObjectZodSchema = makeSchema();
