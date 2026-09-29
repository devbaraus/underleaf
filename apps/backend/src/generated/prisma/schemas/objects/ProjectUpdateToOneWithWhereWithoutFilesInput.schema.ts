import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectWhereInputObjectSchema as ProjectWhereInputObjectSchema } from './ProjectWhereInput.schema';
import { ProjectUpdateWithoutFilesInputObjectSchema as ProjectUpdateWithoutFilesInputObjectSchema } from './ProjectUpdateWithoutFilesInput.schema';
import { ProjectUncheckedUpdateWithoutFilesInputObjectSchema as ProjectUncheckedUpdateWithoutFilesInputObjectSchema } from './ProjectUncheckedUpdateWithoutFilesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProjectWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ProjectUpdateWithoutFilesInputObjectSchema), z.lazy(() => ProjectUncheckedUpdateWithoutFilesInputObjectSchema)])
}).strict();
export const ProjectUpdateToOneWithWhereWithoutFilesInputObjectSchema: z.ZodType<Prisma.ProjectUpdateToOneWithWhereWithoutFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectUpdateToOneWithWhereWithoutFilesInput>;
export const ProjectUpdateToOneWithWhereWithoutFilesInputObjectZodSchema = makeSchema();
