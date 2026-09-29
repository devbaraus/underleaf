import type { Prisma } from '../browser';
import * as z from 'zod';
import { ProjectFileSelectObjectSchema as ProjectFileSelectObjectSchema } from './objects/ProjectFileSelect.schema';
import { ProjectFileIncludeObjectSchema as ProjectFileIncludeObjectSchema } from './objects/ProjectFileInclude.schema';
import { ProjectFileCreateInputObjectSchema as ProjectFileCreateInputObjectSchema } from './objects/ProjectFileCreateInput.schema';
import { ProjectFileUncheckedCreateInputObjectSchema as ProjectFileUncheckedCreateInputObjectSchema } from './objects/ProjectFileUncheckedCreateInput.schema';

export const ProjectFileCreateOneSchema: z.ZodType<Prisma.ProjectFileCreateArgs> = z.object({ select: ProjectFileSelectObjectSchema.optional(), include: ProjectFileIncludeObjectSchema.optional(), data: z.union([ProjectFileCreateInputObjectSchema, ProjectFileUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.ProjectFileCreateArgs>;

export const ProjectFileCreateOneZodSchema = z.object({ select: ProjectFileSelectObjectSchema.optional(), include: ProjectFileIncludeObjectSchema.optional(), data: z.union([ProjectFileCreateInputObjectSchema, ProjectFileUncheckedCreateInputObjectSchema]) }).strict();