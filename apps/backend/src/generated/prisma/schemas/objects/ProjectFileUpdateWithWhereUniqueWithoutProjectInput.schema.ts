import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectFileWhereUniqueInputObjectSchema as ProjectFileWhereUniqueInputObjectSchema } from './ProjectFileWhereUniqueInput.schema';
import { ProjectFileUpdateWithoutProjectInputObjectSchema as ProjectFileUpdateWithoutProjectInputObjectSchema } from './ProjectFileUpdateWithoutProjectInput.schema';
import { ProjectFileUncheckedUpdateWithoutProjectInputObjectSchema as ProjectFileUncheckedUpdateWithoutProjectInputObjectSchema } from './ProjectFileUncheckedUpdateWithoutProjectInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProjectFileWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ProjectFileUpdateWithoutProjectInputObjectSchema), z.lazy(() => ProjectFileUncheckedUpdateWithoutProjectInputObjectSchema)])
}).strict();
export const ProjectFileUpdateWithWhereUniqueWithoutProjectInputObjectSchema: z.ZodType<Prisma.ProjectFileUpdateWithWhereUniqueWithoutProjectInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectFileUpdateWithWhereUniqueWithoutProjectInput>;
export const ProjectFileUpdateWithWhereUniqueWithoutProjectInputObjectZodSchema = makeSchema();
