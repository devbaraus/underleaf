import type { Prisma } from '../browser';
import * as z from 'zod';
import { ProjectSelectObjectSchema as ProjectSelectObjectSchema } from './objects/ProjectSelect.schema';
import { ProjectIncludeObjectSchema as ProjectIncludeObjectSchema } from './objects/ProjectInclude.schema';
import { ProjectWhereUniqueInputObjectSchema as ProjectWhereUniqueInputObjectSchema } from './objects/ProjectWhereUniqueInput.schema';

export const ProjectFindUniqueOrThrowSchema: z.ZodType<Prisma.ProjectFindUniqueOrThrowArgs> = z.object({ select: ProjectSelectObjectSchema.optional(), include: ProjectIncludeObjectSchema.optional(), where: ProjectWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ProjectFindUniqueOrThrowArgs>;

export const ProjectFindUniqueOrThrowZodSchema = z.object({ select: ProjectSelectObjectSchema.optional(), include: ProjectIncludeObjectSchema.optional(), where: ProjectWhereUniqueInputObjectSchema }).strict();