import type { Prisma } from '../browser';
import * as z from 'zod';
import { ProjectSelectObjectSchema as ProjectSelectObjectSchema } from './objects/ProjectSelect.schema';
import { ProjectIncludeObjectSchema as ProjectIncludeObjectSchema } from './objects/ProjectInclude.schema';
import { ProjectUpdateInputObjectSchema as ProjectUpdateInputObjectSchema } from './objects/ProjectUpdateInput.schema';
import { ProjectUncheckedUpdateInputObjectSchema as ProjectUncheckedUpdateInputObjectSchema } from './objects/ProjectUncheckedUpdateInput.schema';
import { ProjectWhereUniqueInputObjectSchema as ProjectWhereUniqueInputObjectSchema } from './objects/ProjectWhereUniqueInput.schema';

export const ProjectUpdateOneSchema: z.ZodType<Prisma.ProjectUpdateArgs> = z.object({ select: ProjectSelectObjectSchema.optional(), include: ProjectIncludeObjectSchema.optional(), data: z.union([ProjectUpdateInputObjectSchema, ProjectUncheckedUpdateInputObjectSchema]), where: ProjectWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ProjectUpdateArgs>;

export const ProjectUpdateOneZodSchema = z.object({ select: ProjectSelectObjectSchema.optional(), include: ProjectIncludeObjectSchema.optional(), data: z.union([ProjectUpdateInputObjectSchema, ProjectUncheckedUpdateInputObjectSchema]), where: ProjectWhereUniqueInputObjectSchema }).strict();