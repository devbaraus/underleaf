import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectWhereUniqueInputObjectSchema as ProjectWhereUniqueInputObjectSchema } from './ProjectWhereUniqueInput.schema';
import { ProjectUpdateWithoutOwnerInputObjectSchema as ProjectUpdateWithoutOwnerInputObjectSchema } from './ProjectUpdateWithoutOwnerInput.schema';
import { ProjectUncheckedUpdateWithoutOwnerInputObjectSchema as ProjectUncheckedUpdateWithoutOwnerInputObjectSchema } from './ProjectUncheckedUpdateWithoutOwnerInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProjectWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ProjectUpdateWithoutOwnerInputObjectSchema), z.lazy(() => ProjectUncheckedUpdateWithoutOwnerInputObjectSchema)])
}).strict();
export const ProjectUpdateWithWhereUniqueWithoutOwnerInputObjectSchema: z.ZodType<Prisma.ProjectUpdateWithWhereUniqueWithoutOwnerInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectUpdateWithWhereUniqueWithoutOwnerInput>;
export const ProjectUpdateWithWhereUniqueWithoutOwnerInputObjectZodSchema = makeSchema();
