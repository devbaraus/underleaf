import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectCreateWithoutCompileLogsInputObjectSchema as ProjectCreateWithoutCompileLogsInputObjectSchema } from './ProjectCreateWithoutCompileLogsInput.schema';
import { ProjectUncheckedCreateWithoutCompileLogsInputObjectSchema as ProjectUncheckedCreateWithoutCompileLogsInputObjectSchema } from './ProjectUncheckedCreateWithoutCompileLogsInput.schema';
import { ProjectCreateOrConnectWithoutCompileLogsInputObjectSchema as ProjectCreateOrConnectWithoutCompileLogsInputObjectSchema } from './ProjectCreateOrConnectWithoutCompileLogsInput.schema';
import { ProjectUpsertWithoutCompileLogsInputObjectSchema as ProjectUpsertWithoutCompileLogsInputObjectSchema } from './ProjectUpsertWithoutCompileLogsInput.schema';
import { ProjectWhereUniqueInputObjectSchema as ProjectWhereUniqueInputObjectSchema } from './ProjectWhereUniqueInput.schema';
import { ProjectUpdateToOneWithWhereWithoutCompileLogsInputObjectSchema as ProjectUpdateToOneWithWhereWithoutCompileLogsInputObjectSchema } from './ProjectUpdateToOneWithWhereWithoutCompileLogsInput.schema';
import { ProjectUpdateWithoutCompileLogsInputObjectSchema as ProjectUpdateWithoutCompileLogsInputObjectSchema } from './ProjectUpdateWithoutCompileLogsInput.schema';
import { ProjectUncheckedUpdateWithoutCompileLogsInputObjectSchema as ProjectUncheckedUpdateWithoutCompileLogsInputObjectSchema } from './ProjectUncheckedUpdateWithoutCompileLogsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProjectCreateWithoutCompileLogsInputObjectSchema), z.lazy(() => ProjectUncheckedCreateWithoutCompileLogsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutCompileLogsInputObjectSchema).optional(),
  upsert: z.lazy(() => ProjectUpsertWithoutCompileLogsInputObjectSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ProjectUpdateToOneWithWhereWithoutCompileLogsInputObjectSchema), z.lazy(() => ProjectUpdateWithoutCompileLogsInputObjectSchema), z.lazy(() => ProjectUncheckedUpdateWithoutCompileLogsInputObjectSchema)]).optional()
}).strict();
export const ProjectUpdateOneRequiredWithoutCompileLogsNestedInputObjectSchema: z.ZodType<Prisma.ProjectUpdateOneRequiredWithoutCompileLogsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectUpdateOneRequiredWithoutCompileLogsNestedInput>;
export const ProjectUpdateOneRequiredWithoutCompileLogsNestedInputObjectZodSchema = makeSchema();
