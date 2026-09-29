import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectWhereUniqueInputObjectSchema as ProjectWhereUniqueInputObjectSchema } from './ProjectWhereUniqueInput.schema';
import { ProjectUpdateWithoutOwnerInputObjectSchema as ProjectUpdateWithoutOwnerInputObjectSchema } from './ProjectUpdateWithoutOwnerInput.schema';
import { ProjectUncheckedUpdateWithoutOwnerInputObjectSchema as ProjectUncheckedUpdateWithoutOwnerInputObjectSchema } from './ProjectUncheckedUpdateWithoutOwnerInput.schema';
import { ProjectCreateWithoutOwnerInputObjectSchema as ProjectCreateWithoutOwnerInputObjectSchema } from './ProjectCreateWithoutOwnerInput.schema';
import { ProjectUncheckedCreateWithoutOwnerInputObjectSchema as ProjectUncheckedCreateWithoutOwnerInputObjectSchema } from './ProjectUncheckedCreateWithoutOwnerInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProjectWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ProjectUpdateWithoutOwnerInputObjectSchema), z.lazy(() => ProjectUncheckedUpdateWithoutOwnerInputObjectSchema)]),
  create: z.union([z.lazy(() => ProjectCreateWithoutOwnerInputObjectSchema), z.lazy(() => ProjectUncheckedCreateWithoutOwnerInputObjectSchema)])
}).strict();
export const ProjectUpsertWithWhereUniqueWithoutOwnerInputObjectSchema: z.ZodType<Prisma.ProjectUpsertWithWhereUniqueWithoutOwnerInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectUpsertWithWhereUniqueWithoutOwnerInput>;
export const ProjectUpsertWithWhereUniqueWithoutOwnerInputObjectZodSchema = makeSchema();
