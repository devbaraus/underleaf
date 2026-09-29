import type { Prisma } from '../browser';
import * as z from 'zod';
import { ProjectFileSelectObjectSchema as ProjectFileSelectObjectSchema } from './objects/ProjectFileSelect.schema';
import { ProjectFileIncludeObjectSchema as ProjectFileIncludeObjectSchema } from './objects/ProjectFileInclude.schema';
import { ProjectFileWhereUniqueInputObjectSchema as ProjectFileWhereUniqueInputObjectSchema } from './objects/ProjectFileWhereUniqueInput.schema';

export const ProjectFileFindUniqueSchema: z.ZodType<Prisma.ProjectFileFindUniqueArgs> = z.object({ select: ProjectFileSelectObjectSchema.optional(), include: ProjectFileIncludeObjectSchema.optional(), where: ProjectFileWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ProjectFileFindUniqueArgs>;

export const ProjectFileFindUniqueZodSchema = z.object({ select: ProjectFileSelectObjectSchema.optional(), include: ProjectFileIncludeObjectSchema.optional(), where: ProjectFileWhereUniqueInputObjectSchema }).strict();