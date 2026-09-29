import type { Prisma } from '../browser';
import * as z from 'zod';
import { ProjectFileIncludeObjectSchema as ProjectFileIncludeObjectSchema } from './objects/ProjectFileInclude.schema';
import { ProjectFileOrderByWithRelationInputObjectSchema as ProjectFileOrderByWithRelationInputObjectSchema } from './objects/ProjectFileOrderByWithRelationInput.schema';
import { ProjectFileWhereInputObjectSchema as ProjectFileWhereInputObjectSchema } from './objects/ProjectFileWhereInput.schema';
import { ProjectFileWhereUniqueInputObjectSchema as ProjectFileWhereUniqueInputObjectSchema } from './objects/ProjectFileWhereUniqueInput.schema';
import { ProjectFileScalarFieldEnumSchema } from './enums/ProjectFileScalarFieldEnum.schema';
import { ProjectArgsObjectSchema as ProjectArgsObjectSchema } from './objects/ProjectArgs.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ProjectFileFindFirstSelectSchema: z.ZodType<Prisma.ProjectFileSelect> = z.object({
    id: z.boolean().optional(),
    projectId: z.boolean().optional(),
    name: z.boolean().optional(),
    path: z.boolean().optional(),
    content: z.boolean().optional(),
    isMain: z.boolean().optional(),
    type: z.boolean().optional(),
    sizeBytes: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    project: z.union([z.boolean(), z.lazy(() => ProjectArgsObjectSchema)]).optional()
  }).strict() as unknown as z.ZodType<Prisma.ProjectFileSelect>;

export const ProjectFileFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    projectId: z.boolean().optional(),
    name: z.boolean().optional(),
    path: z.boolean().optional(),
    content: z.boolean().optional(),
    isMain: z.boolean().optional(),
    type: z.boolean().optional(),
    sizeBytes: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    project: z.union([z.boolean(), z.lazy(() => ProjectArgsObjectSchema)]).optional()
  }).strict();

export const ProjectFileFindFirstSchema: z.ZodType<Prisma.ProjectFileFindFirstArgs> = z.object({ select: ProjectFileFindFirstSelectSchema.optional(), include: z.lazy(() => ProjectFileIncludeObjectSchema.optional()), orderBy: z.union([ProjectFileOrderByWithRelationInputObjectSchema, ProjectFileOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProjectFileWhereInputObjectSchema.optional(), cursor: ProjectFileWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ProjectFileScalarFieldEnumSchema, ProjectFileScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ProjectFileFindFirstArgs>;

export const ProjectFileFindFirstZodSchema = z.object({ select: ProjectFileFindFirstSelectSchema.optional(), include: z.lazy(() => ProjectFileIncludeObjectSchema.optional()), orderBy: z.union([ProjectFileOrderByWithRelationInputObjectSchema, ProjectFileOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProjectFileWhereInputObjectSchema.optional(), cursor: ProjectFileWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ProjectFileScalarFieldEnumSchema, ProjectFileScalarFieldEnumSchema.array()]).optional() }).strict();