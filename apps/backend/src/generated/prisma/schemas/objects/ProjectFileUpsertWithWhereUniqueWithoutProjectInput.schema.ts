import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectFileWhereUniqueInputObjectSchema as ProjectFileWhereUniqueInputObjectSchema } from './ProjectFileWhereUniqueInput.schema';
import { ProjectFileUpdateWithoutProjectInputObjectSchema as ProjectFileUpdateWithoutProjectInputObjectSchema } from './ProjectFileUpdateWithoutProjectInput.schema';
import { ProjectFileUncheckedUpdateWithoutProjectInputObjectSchema as ProjectFileUncheckedUpdateWithoutProjectInputObjectSchema } from './ProjectFileUncheckedUpdateWithoutProjectInput.schema';
import { ProjectFileCreateWithoutProjectInputObjectSchema as ProjectFileCreateWithoutProjectInputObjectSchema } from './ProjectFileCreateWithoutProjectInput.schema';
import { ProjectFileUncheckedCreateWithoutProjectInputObjectSchema as ProjectFileUncheckedCreateWithoutProjectInputObjectSchema } from './ProjectFileUncheckedCreateWithoutProjectInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProjectFileWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ProjectFileUpdateWithoutProjectInputObjectSchema), z.lazy(() => ProjectFileUncheckedUpdateWithoutProjectInputObjectSchema)]),
  create: z.union([z.lazy(() => ProjectFileCreateWithoutProjectInputObjectSchema), z.lazy(() => ProjectFileUncheckedCreateWithoutProjectInputObjectSchema)])
}).strict();
export const ProjectFileUpsertWithWhereUniqueWithoutProjectInputObjectSchema: z.ZodType<Prisma.ProjectFileUpsertWithWhereUniqueWithoutProjectInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectFileUpsertWithWhereUniqueWithoutProjectInput>;
export const ProjectFileUpsertWithWhereUniqueWithoutProjectInputObjectZodSchema = makeSchema();
