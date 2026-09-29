import type { Prisma } from '../browser';
import * as z from 'zod';
import { ProjectSelectObjectSchema as ProjectSelectObjectSchema } from './objects/ProjectSelect.schema';
import { ProjectIncludeObjectSchema as ProjectIncludeObjectSchema } from './objects/ProjectInclude.schema';
import { ProjectCreateInputObjectSchema as ProjectCreateInputObjectSchema } from './objects/ProjectCreateInput.schema';
import { ProjectUncheckedCreateInputObjectSchema as ProjectUncheckedCreateInputObjectSchema } from './objects/ProjectUncheckedCreateInput.schema';

export const ProjectCreateOneSchema: z.ZodType<Prisma.ProjectCreateArgs> = z.object({ select: ProjectSelectObjectSchema.optional(), include: ProjectIncludeObjectSchema.optional(), data: z.union([ProjectCreateInputObjectSchema, ProjectUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.ProjectCreateArgs>;

export const ProjectCreateOneZodSchema = z.object({ select: ProjectSelectObjectSchema.optional(), include: ProjectIncludeObjectSchema.optional(), data: z.union([ProjectCreateInputObjectSchema, ProjectUncheckedCreateInputObjectSchema]) }).strict();