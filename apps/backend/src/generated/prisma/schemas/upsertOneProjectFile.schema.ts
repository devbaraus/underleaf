import type { Prisma } from '../browser';
import * as z from 'zod';
import { ProjectFileSelectObjectSchema as ProjectFileSelectObjectSchema } from './objects/ProjectFileSelect.schema';
import { ProjectFileIncludeObjectSchema as ProjectFileIncludeObjectSchema } from './objects/ProjectFileInclude.schema';
import { ProjectFileWhereUniqueInputObjectSchema as ProjectFileWhereUniqueInputObjectSchema } from './objects/ProjectFileWhereUniqueInput.schema';
import { ProjectFileCreateInputObjectSchema as ProjectFileCreateInputObjectSchema } from './objects/ProjectFileCreateInput.schema';
import { ProjectFileUncheckedCreateInputObjectSchema as ProjectFileUncheckedCreateInputObjectSchema } from './objects/ProjectFileUncheckedCreateInput.schema';
import { ProjectFileUpdateInputObjectSchema as ProjectFileUpdateInputObjectSchema } from './objects/ProjectFileUpdateInput.schema';
import { ProjectFileUncheckedUpdateInputObjectSchema as ProjectFileUncheckedUpdateInputObjectSchema } from './objects/ProjectFileUncheckedUpdateInput.schema';

export const ProjectFileUpsertOneSchema: z.ZodType<Prisma.ProjectFileUpsertArgs> = z.object({ select: ProjectFileSelectObjectSchema.optional(), include: ProjectFileIncludeObjectSchema.optional(), where: ProjectFileWhereUniqueInputObjectSchema, create: z.union([ ProjectFileCreateInputObjectSchema, ProjectFileUncheckedCreateInputObjectSchema ]), update: z.union([ ProjectFileUpdateInputObjectSchema, ProjectFileUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.ProjectFileUpsertArgs>;

export const ProjectFileUpsertOneZodSchema = z.object({ select: ProjectFileSelectObjectSchema.optional(), include: ProjectFileIncludeObjectSchema.optional(), where: ProjectFileWhereUniqueInputObjectSchema, create: z.union([ ProjectFileCreateInputObjectSchema, ProjectFileUncheckedCreateInputObjectSchema ]), update: z.union([ ProjectFileUpdateInputObjectSchema, ProjectFileUncheckedUpdateInputObjectSchema ]) }).strict();