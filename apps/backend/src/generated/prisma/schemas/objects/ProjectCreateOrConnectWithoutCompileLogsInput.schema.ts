import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectWhereUniqueInputObjectSchema as ProjectWhereUniqueInputObjectSchema } from './ProjectWhereUniqueInput.schema';
import { ProjectCreateWithoutCompileLogsInputObjectSchema as ProjectCreateWithoutCompileLogsInputObjectSchema } from './ProjectCreateWithoutCompileLogsInput.schema';
import { ProjectUncheckedCreateWithoutCompileLogsInputObjectSchema as ProjectUncheckedCreateWithoutCompileLogsInputObjectSchema } from './ProjectUncheckedCreateWithoutCompileLogsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProjectWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ProjectCreateWithoutCompileLogsInputObjectSchema), z.lazy(() => ProjectUncheckedCreateWithoutCompileLogsInputObjectSchema)])
}).strict();
export const ProjectCreateOrConnectWithoutCompileLogsInputObjectSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutCompileLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectCreateOrConnectWithoutCompileLogsInput>;
export const ProjectCreateOrConnectWithoutCompileLogsInputObjectZodSchema = makeSchema();
