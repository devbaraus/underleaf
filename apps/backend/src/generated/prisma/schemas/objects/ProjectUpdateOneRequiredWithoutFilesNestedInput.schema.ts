import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectCreateWithoutFilesInputObjectSchema as ProjectCreateWithoutFilesInputObjectSchema } from './ProjectCreateWithoutFilesInput.schema';
import { ProjectUncheckedCreateWithoutFilesInputObjectSchema as ProjectUncheckedCreateWithoutFilesInputObjectSchema } from './ProjectUncheckedCreateWithoutFilesInput.schema';
import { ProjectCreateOrConnectWithoutFilesInputObjectSchema as ProjectCreateOrConnectWithoutFilesInputObjectSchema } from './ProjectCreateOrConnectWithoutFilesInput.schema';
import { ProjectUpsertWithoutFilesInputObjectSchema as ProjectUpsertWithoutFilesInputObjectSchema } from './ProjectUpsertWithoutFilesInput.schema';
import { ProjectWhereUniqueInputObjectSchema as ProjectWhereUniqueInputObjectSchema } from './ProjectWhereUniqueInput.schema';
import { ProjectUpdateToOneWithWhereWithoutFilesInputObjectSchema as ProjectUpdateToOneWithWhereWithoutFilesInputObjectSchema } from './ProjectUpdateToOneWithWhereWithoutFilesInput.schema';
import { ProjectUpdateWithoutFilesInputObjectSchema as ProjectUpdateWithoutFilesInputObjectSchema } from './ProjectUpdateWithoutFilesInput.schema';
import { ProjectUncheckedUpdateWithoutFilesInputObjectSchema as ProjectUncheckedUpdateWithoutFilesInputObjectSchema } from './ProjectUncheckedUpdateWithoutFilesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProjectCreateWithoutFilesInputObjectSchema), z.lazy(() => ProjectUncheckedCreateWithoutFilesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutFilesInputObjectSchema).optional(),
  upsert: z.lazy(() => ProjectUpsertWithoutFilesInputObjectSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ProjectUpdateToOneWithWhereWithoutFilesInputObjectSchema), z.lazy(() => ProjectUpdateWithoutFilesInputObjectSchema), z.lazy(() => ProjectUncheckedUpdateWithoutFilesInputObjectSchema)]).optional()
}).strict();
export const ProjectUpdateOneRequiredWithoutFilesNestedInputObjectSchema: z.ZodType<Prisma.ProjectUpdateOneRequiredWithoutFilesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectUpdateOneRequiredWithoutFilesNestedInput>;
export const ProjectUpdateOneRequiredWithoutFilesNestedInputObjectZodSchema = makeSchema();
