import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectCreateWithoutFilesInputObjectSchema as ProjectCreateWithoutFilesInputObjectSchema } from './ProjectCreateWithoutFilesInput.schema';
import { ProjectUncheckedCreateWithoutFilesInputObjectSchema as ProjectUncheckedCreateWithoutFilesInputObjectSchema } from './ProjectUncheckedCreateWithoutFilesInput.schema';
import { ProjectCreateOrConnectWithoutFilesInputObjectSchema as ProjectCreateOrConnectWithoutFilesInputObjectSchema } from './ProjectCreateOrConnectWithoutFilesInput.schema';
import { ProjectWhereUniqueInputObjectSchema as ProjectWhereUniqueInputObjectSchema } from './ProjectWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProjectCreateWithoutFilesInputObjectSchema), z.lazy(() => ProjectUncheckedCreateWithoutFilesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutFilesInputObjectSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputObjectSchema).optional()
}).strict();
export const ProjectCreateNestedOneWithoutFilesInputObjectSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectCreateNestedOneWithoutFilesInput>;
export const ProjectCreateNestedOneWithoutFilesInputObjectZodSchema = makeSchema();
