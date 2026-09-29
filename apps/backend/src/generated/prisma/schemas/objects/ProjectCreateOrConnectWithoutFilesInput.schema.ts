import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectWhereUniqueInputObjectSchema as ProjectWhereUniqueInputObjectSchema } from './ProjectWhereUniqueInput.schema';
import { ProjectCreateWithoutFilesInputObjectSchema as ProjectCreateWithoutFilesInputObjectSchema } from './ProjectCreateWithoutFilesInput.schema';
import { ProjectUncheckedCreateWithoutFilesInputObjectSchema as ProjectUncheckedCreateWithoutFilesInputObjectSchema } from './ProjectUncheckedCreateWithoutFilesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProjectWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ProjectCreateWithoutFilesInputObjectSchema), z.lazy(() => ProjectUncheckedCreateWithoutFilesInputObjectSchema)])
}).strict();
export const ProjectCreateOrConnectWithoutFilesInputObjectSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectCreateOrConnectWithoutFilesInput>;
export const ProjectCreateOrConnectWithoutFilesInputObjectZodSchema = makeSchema();
