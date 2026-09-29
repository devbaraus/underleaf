import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectCreateWithoutCompileLogsInputObjectSchema as ProjectCreateWithoutCompileLogsInputObjectSchema } from './ProjectCreateWithoutCompileLogsInput.schema';
import { ProjectUncheckedCreateWithoutCompileLogsInputObjectSchema as ProjectUncheckedCreateWithoutCompileLogsInputObjectSchema } from './ProjectUncheckedCreateWithoutCompileLogsInput.schema';
import { ProjectCreateOrConnectWithoutCompileLogsInputObjectSchema as ProjectCreateOrConnectWithoutCompileLogsInputObjectSchema } from './ProjectCreateOrConnectWithoutCompileLogsInput.schema';
import { ProjectWhereUniqueInputObjectSchema as ProjectWhereUniqueInputObjectSchema } from './ProjectWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProjectCreateWithoutCompileLogsInputObjectSchema), z.lazy(() => ProjectUncheckedCreateWithoutCompileLogsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutCompileLogsInputObjectSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputObjectSchema).optional()
}).strict();
export const ProjectCreateNestedOneWithoutCompileLogsInputObjectSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutCompileLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectCreateNestedOneWithoutCompileLogsInput>;
export const ProjectCreateNestedOneWithoutCompileLogsInputObjectZodSchema = makeSchema();
