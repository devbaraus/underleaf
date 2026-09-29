import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectUpdateWithoutFilesInputObjectSchema as ProjectUpdateWithoutFilesInputObjectSchema } from './ProjectUpdateWithoutFilesInput.schema';
import { ProjectUncheckedUpdateWithoutFilesInputObjectSchema as ProjectUncheckedUpdateWithoutFilesInputObjectSchema } from './ProjectUncheckedUpdateWithoutFilesInput.schema';
import { ProjectCreateWithoutFilesInputObjectSchema as ProjectCreateWithoutFilesInputObjectSchema } from './ProjectCreateWithoutFilesInput.schema';
import { ProjectUncheckedCreateWithoutFilesInputObjectSchema as ProjectUncheckedCreateWithoutFilesInputObjectSchema } from './ProjectUncheckedCreateWithoutFilesInput.schema';
import { ProjectWhereInputObjectSchema as ProjectWhereInputObjectSchema } from './ProjectWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ProjectUpdateWithoutFilesInputObjectSchema), z.lazy(() => ProjectUncheckedUpdateWithoutFilesInputObjectSchema)]),
  create: z.union([z.lazy(() => ProjectCreateWithoutFilesInputObjectSchema), z.lazy(() => ProjectUncheckedCreateWithoutFilesInputObjectSchema)]),
  where: z.lazy(() => ProjectWhereInputObjectSchema).optional()
}).strict();
export const ProjectUpsertWithoutFilesInputObjectSchema: z.ZodType<Prisma.ProjectUpsertWithoutFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectUpsertWithoutFilesInput>;
export const ProjectUpsertWithoutFilesInputObjectZodSchema = makeSchema();
