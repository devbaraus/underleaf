import type { Prisma } from '../browser';
import * as z from 'zod';
import { ProjectFileSelectObjectSchema as ProjectFileSelectObjectSchema } from './objects/ProjectFileSelect.schema';
import { ProjectFileIncludeObjectSchema as ProjectFileIncludeObjectSchema } from './objects/ProjectFileInclude.schema';
import { ProjectFileWhereUniqueInputObjectSchema as ProjectFileWhereUniqueInputObjectSchema } from './objects/ProjectFileWhereUniqueInput.schema';

export const ProjectFileDeleteOneSchema: z.ZodType<Prisma.ProjectFileDeleteArgs> = z.object({ select: ProjectFileSelectObjectSchema.optional(), include: ProjectFileIncludeObjectSchema.optional(), where: ProjectFileWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ProjectFileDeleteArgs>;

export const ProjectFileDeleteOneZodSchema = z.object({ select: ProjectFileSelectObjectSchema.optional(), include: ProjectFileIncludeObjectSchema.optional(), where: ProjectFileWhereUniqueInputObjectSchema }).strict();