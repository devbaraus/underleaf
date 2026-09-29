import type { Prisma } from '../browser';
import * as z from 'zod';
import { ProjectSelectObjectSchema as ProjectSelectObjectSchema } from './objects/ProjectSelect.schema';
import { ProjectIncludeObjectSchema as ProjectIncludeObjectSchema } from './objects/ProjectInclude.schema';
import { ProjectWhereUniqueInputObjectSchema as ProjectWhereUniqueInputObjectSchema } from './objects/ProjectWhereUniqueInput.schema';

export const ProjectFindUniqueSchema: z.ZodType<Prisma.ProjectFindUniqueArgs> = z.object({ select: ProjectSelectObjectSchema.optional(), include: ProjectIncludeObjectSchema.optional(), where: ProjectWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ProjectFindUniqueArgs>;

export const ProjectFindUniqueZodSchema = z.object({ select: ProjectSelectObjectSchema.optional(), include: ProjectIncludeObjectSchema.optional(), where: ProjectWhereUniqueInputObjectSchema }).strict();