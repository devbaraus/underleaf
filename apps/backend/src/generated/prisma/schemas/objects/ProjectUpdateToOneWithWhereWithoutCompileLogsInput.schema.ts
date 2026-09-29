import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectWhereInputObjectSchema as ProjectWhereInputObjectSchema } from './ProjectWhereInput.schema';
import { ProjectUpdateWithoutCompileLogsInputObjectSchema as ProjectUpdateWithoutCompileLogsInputObjectSchema } from './ProjectUpdateWithoutCompileLogsInput.schema';
import { ProjectUncheckedUpdateWithoutCompileLogsInputObjectSchema as ProjectUncheckedUpdateWithoutCompileLogsInputObjectSchema } from './ProjectUncheckedUpdateWithoutCompileLogsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProjectWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ProjectUpdateWithoutCompileLogsInputObjectSchema), z.lazy(() => ProjectUncheckedUpdateWithoutCompileLogsInputObjectSchema)])
}).strict();
export const ProjectUpdateToOneWithWhereWithoutCompileLogsInputObjectSchema: z.ZodType<Prisma.ProjectUpdateToOneWithWhereWithoutCompileLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectUpdateToOneWithWhereWithoutCompileLogsInput>;
export const ProjectUpdateToOneWithWhereWithoutCompileLogsInputObjectZodSchema = makeSchema();
