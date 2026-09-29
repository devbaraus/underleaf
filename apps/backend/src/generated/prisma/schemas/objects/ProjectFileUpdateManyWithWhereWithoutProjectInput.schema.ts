import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectFileScalarWhereInputObjectSchema as ProjectFileScalarWhereInputObjectSchema } from './ProjectFileScalarWhereInput.schema';
import { ProjectFileUpdateManyMutationInputObjectSchema as ProjectFileUpdateManyMutationInputObjectSchema } from './ProjectFileUpdateManyMutationInput.schema';
import { ProjectFileUncheckedUpdateManyWithoutProjectInputObjectSchema as ProjectFileUncheckedUpdateManyWithoutProjectInputObjectSchema } from './ProjectFileUncheckedUpdateManyWithoutProjectInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProjectFileScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ProjectFileUpdateManyMutationInputObjectSchema), z.lazy(() => ProjectFileUncheckedUpdateManyWithoutProjectInputObjectSchema)])
}).strict();
export const ProjectFileUpdateManyWithWhereWithoutProjectInputObjectSchema: z.ZodType<Prisma.ProjectFileUpdateManyWithWhereWithoutProjectInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectFileUpdateManyWithWhereWithoutProjectInput>;
export const ProjectFileUpdateManyWithWhereWithoutProjectInputObjectZodSchema = makeSchema();
