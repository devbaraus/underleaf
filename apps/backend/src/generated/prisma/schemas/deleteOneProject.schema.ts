import type { Prisma } from '../browser';
import * as z from 'zod';
import { ProjectSelectObjectSchema as ProjectSelectObjectSchema } from './objects/ProjectSelect.schema';
import { ProjectIncludeObjectSchema as ProjectIncludeObjectSchema } from './objects/ProjectInclude.schema';
import { ProjectWhereUniqueInputObjectSchema as ProjectWhereUniqueInputObjectSchema } from './objects/ProjectWhereUniqueInput.schema';

export const ProjectDeleteOneSchema: z.ZodType<Prisma.ProjectDeleteArgs> = z.object({ select: ProjectSelectObjectSchema.optional(), include: ProjectIncludeObjectSchema.optional(), where: ProjectWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ProjectDeleteArgs>;

export const ProjectDeleteOneZodSchema = z.object({ select: ProjectSelectObjectSchema.optional(), include: ProjectIncludeObjectSchema.optional(), where: ProjectWhereUniqueInputObjectSchema }).strict();