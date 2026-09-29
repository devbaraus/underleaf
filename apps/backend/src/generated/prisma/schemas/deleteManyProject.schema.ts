import type { Prisma } from '../browser';
import * as z from 'zod';
import { ProjectWhereInputObjectSchema as ProjectWhereInputObjectSchema } from './objects/ProjectWhereInput.schema';

export const ProjectDeleteManySchema: z.ZodType<Prisma.ProjectDeleteManyArgs> = z.object({ where: ProjectWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ProjectDeleteManyArgs>;

export const ProjectDeleteManyZodSchema = z.object({ where: ProjectWhereInputObjectSchema.optional() }).strict();