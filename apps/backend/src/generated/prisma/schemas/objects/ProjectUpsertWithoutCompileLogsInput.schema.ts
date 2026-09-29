import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectUpdateWithoutCompileLogsInputObjectSchema as ProjectUpdateWithoutCompileLogsInputObjectSchema } from './ProjectUpdateWithoutCompileLogsInput.schema';
import { ProjectUncheckedUpdateWithoutCompileLogsInputObjectSchema as ProjectUncheckedUpdateWithoutCompileLogsInputObjectSchema } from './ProjectUncheckedUpdateWithoutCompileLogsInput.schema';
import { ProjectCreateWithoutCompileLogsInputObjectSchema as ProjectCreateWithoutCompileLogsInputObjectSchema } from './ProjectCreateWithoutCompileLogsInput.schema';
import { ProjectUncheckedCreateWithoutCompileLogsInputObjectSchema as ProjectUncheckedCreateWithoutCompileLogsInputObjectSchema } from './ProjectUncheckedCreateWithoutCompileLogsInput.schema';
import { ProjectWhereInputObjectSchema as ProjectWhereInputObjectSchema } from './ProjectWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ProjectUpdateWithoutCompileLogsInputObjectSchema), z.lazy(() => ProjectUncheckedUpdateWithoutCompileLogsInputObjectSchema)]),
  create: z.union([z.lazy(() => ProjectCreateWithoutCompileLogsInputObjectSchema), z.lazy(() => ProjectUncheckedCreateWithoutCompileLogsInputObjectSchema)]),
  where: z.lazy(() => ProjectWhereInputObjectSchema).optional()
}).strict();
export const ProjectUpsertWithoutCompileLogsInputObjectSchema: z.ZodType<Prisma.ProjectUpsertWithoutCompileLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectUpsertWithoutCompileLogsInput>;
export const ProjectUpsertWithoutCompileLogsInputObjectZodSchema = makeSchema();
