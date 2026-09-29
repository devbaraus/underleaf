import type { Prisma } from '../browser';
import * as z from 'zod';
import { ProjectFileSelectObjectSchema as ProjectFileSelectObjectSchema } from './objects/ProjectFileSelect.schema';
import { ProjectFileIncludeObjectSchema as ProjectFileIncludeObjectSchema } from './objects/ProjectFileInclude.schema';
import { ProjectFileUpdateInputObjectSchema as ProjectFileUpdateInputObjectSchema } from './objects/ProjectFileUpdateInput.schema';
import { ProjectFileUncheckedUpdateInputObjectSchema as ProjectFileUncheckedUpdateInputObjectSchema } from './objects/ProjectFileUncheckedUpdateInput.schema';
import { ProjectFileWhereUniqueInputObjectSchema as ProjectFileWhereUniqueInputObjectSchema } from './objects/ProjectFileWhereUniqueInput.schema';

export const ProjectFileUpdateOneSchema: z.ZodType<Prisma.ProjectFileUpdateArgs> = z.object({ select: ProjectFileSelectObjectSchema.optional(), include: ProjectFileIncludeObjectSchema.optional(), data: z.union([ProjectFileUpdateInputObjectSchema, ProjectFileUncheckedUpdateInputObjectSchema]), where: ProjectFileWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ProjectFileUpdateArgs>;

export const ProjectFileUpdateOneZodSchema = z.object({ select: ProjectFileSelectObjectSchema.optional(), include: ProjectFileIncludeObjectSchema.optional(), data: z.union([ProjectFileUpdateInputObjectSchema, ProjectFileUncheckedUpdateInputObjectSchema]), where: ProjectFileWhereUniqueInputObjectSchema }).strict();