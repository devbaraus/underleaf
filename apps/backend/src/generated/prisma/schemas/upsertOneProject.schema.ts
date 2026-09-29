import type { Prisma } from '../browser';
import * as z from 'zod';
import { ProjectSelectObjectSchema as ProjectSelectObjectSchema } from './objects/ProjectSelect.schema';
import { ProjectIncludeObjectSchema as ProjectIncludeObjectSchema } from './objects/ProjectInclude.schema';
import { ProjectWhereUniqueInputObjectSchema as ProjectWhereUniqueInputObjectSchema } from './objects/ProjectWhereUniqueInput.schema';
import { ProjectCreateInputObjectSchema as ProjectCreateInputObjectSchema } from './objects/ProjectCreateInput.schema';
import { ProjectUncheckedCreateInputObjectSchema as ProjectUncheckedCreateInputObjectSchema } from './objects/ProjectUncheckedCreateInput.schema';
import { ProjectUpdateInputObjectSchema as ProjectUpdateInputObjectSchema } from './objects/ProjectUpdateInput.schema';
import { ProjectUncheckedUpdateInputObjectSchema as ProjectUncheckedUpdateInputObjectSchema } from './objects/ProjectUncheckedUpdateInput.schema';

export const ProjectUpsertOneSchema: z.ZodType<Prisma.ProjectUpsertArgs> = z.object({ select: ProjectSelectObjectSchema.optional(), include: ProjectIncludeObjectSchema.optional(), where: ProjectWhereUniqueInputObjectSchema, create: z.union([ ProjectCreateInputObjectSchema, ProjectUncheckedCreateInputObjectSchema ]), update: z.union([ ProjectUpdateInputObjectSchema, ProjectUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.ProjectUpsertArgs>;

export const ProjectUpsertOneZodSchema = z.object({ select: ProjectSelectObjectSchema.optional(), include: ProjectIncludeObjectSchema.optional(), where: ProjectWhereUniqueInputObjectSchema, create: z.union([ ProjectCreateInputObjectSchema, ProjectUncheckedCreateInputObjectSchema ]), update: z.union([ ProjectUpdateInputObjectSchema, ProjectUncheckedUpdateInputObjectSchema ]) }).strict();