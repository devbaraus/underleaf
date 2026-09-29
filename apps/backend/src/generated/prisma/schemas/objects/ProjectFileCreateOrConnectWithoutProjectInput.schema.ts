import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectFileWhereUniqueInputObjectSchema as ProjectFileWhereUniqueInputObjectSchema } from './ProjectFileWhereUniqueInput.schema';
import { ProjectFileCreateWithoutProjectInputObjectSchema as ProjectFileCreateWithoutProjectInputObjectSchema } from './ProjectFileCreateWithoutProjectInput.schema';
import { ProjectFileUncheckedCreateWithoutProjectInputObjectSchema as ProjectFileUncheckedCreateWithoutProjectInputObjectSchema } from './ProjectFileUncheckedCreateWithoutProjectInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProjectFileWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ProjectFileCreateWithoutProjectInputObjectSchema), z.lazy(() => ProjectFileUncheckedCreateWithoutProjectInputObjectSchema)])
}).strict();
export const ProjectFileCreateOrConnectWithoutProjectInputObjectSchema: z.ZodType<Prisma.ProjectFileCreateOrConnectWithoutProjectInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectFileCreateOrConnectWithoutProjectInput>;
export const ProjectFileCreateOrConnectWithoutProjectInputObjectZodSchema = makeSchema();
