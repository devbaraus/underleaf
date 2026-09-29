import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectScalarWhereInputObjectSchema as ProjectScalarWhereInputObjectSchema } from './ProjectScalarWhereInput.schema';
import { ProjectUpdateManyMutationInputObjectSchema as ProjectUpdateManyMutationInputObjectSchema } from './ProjectUpdateManyMutationInput.schema';
import { ProjectUncheckedUpdateManyWithoutOwnerInputObjectSchema as ProjectUncheckedUpdateManyWithoutOwnerInputObjectSchema } from './ProjectUncheckedUpdateManyWithoutOwnerInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProjectScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ProjectUpdateManyMutationInputObjectSchema), z.lazy(() => ProjectUncheckedUpdateManyWithoutOwnerInputObjectSchema)])
}).strict();
export const ProjectUpdateManyWithWhereWithoutOwnerInputObjectSchema: z.ZodType<Prisma.ProjectUpdateManyWithWhereWithoutOwnerInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectUpdateManyWithWhereWithoutOwnerInput>;
export const ProjectUpdateManyWithWhereWithoutOwnerInputObjectZodSchema = makeSchema();
