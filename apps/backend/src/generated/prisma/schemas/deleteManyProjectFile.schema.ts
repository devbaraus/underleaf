import type { Prisma } from '../browser';
import * as z from 'zod';
import { ProjectFileWhereInputObjectSchema as ProjectFileWhereInputObjectSchema } from './objects/ProjectFileWhereInput.schema';

export const ProjectFileDeleteManySchema: z.ZodType<Prisma.ProjectFileDeleteManyArgs> = z.object({ where: ProjectFileWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ProjectFileDeleteManyArgs>;

export const ProjectFileDeleteManyZodSchema = z.object({ where: ProjectFileWhereInputObjectSchema.optional() }).strict();