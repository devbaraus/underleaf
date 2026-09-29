import type { Prisma } from '../browser';
import * as z from 'zod';
import { ProjectFileUpdateManyMutationInputObjectSchema as ProjectFileUpdateManyMutationInputObjectSchema } from './objects/ProjectFileUpdateManyMutationInput.schema';
import { ProjectFileWhereInputObjectSchema as ProjectFileWhereInputObjectSchema } from './objects/ProjectFileWhereInput.schema';

export const ProjectFileUpdateManySchema: z.ZodType<Prisma.ProjectFileUpdateManyArgs> = z.object({ data: ProjectFileUpdateManyMutationInputObjectSchema, where: ProjectFileWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ProjectFileUpdateManyArgs>;

export const ProjectFileUpdateManyZodSchema = z.object({ data: ProjectFileUpdateManyMutationInputObjectSchema, where: ProjectFileWhereInputObjectSchema.optional() }).strict();