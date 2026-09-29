import type { Prisma } from '../browser';
import * as z from 'zod';
import { ProjectUpdateManyMutationInputObjectSchema as ProjectUpdateManyMutationInputObjectSchema } from './objects/ProjectUpdateManyMutationInput.schema';
import { ProjectWhereInputObjectSchema as ProjectWhereInputObjectSchema } from './objects/ProjectWhereInput.schema';

export const ProjectUpdateManySchema: z.ZodType<Prisma.ProjectUpdateManyArgs> = z.object({ data: ProjectUpdateManyMutationInputObjectSchema, where: ProjectWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ProjectUpdateManyArgs>;

export const ProjectUpdateManyZodSchema = z.object({ data: ProjectUpdateManyMutationInputObjectSchema, where: ProjectWhereInputObjectSchema.optional() }).strict();