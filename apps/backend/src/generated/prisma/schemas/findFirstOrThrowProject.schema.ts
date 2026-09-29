import type { Prisma } from '../browser';
import * as z from 'zod';
import { ProjectIncludeObjectSchema as ProjectIncludeObjectSchema } from './objects/ProjectInclude.schema';
import { ProjectOrderByWithRelationInputObjectSchema as ProjectOrderByWithRelationInputObjectSchema } from './objects/ProjectOrderByWithRelationInput.schema';
import { ProjectWhereInputObjectSchema as ProjectWhereInputObjectSchema } from './objects/ProjectWhereInput.schema';
import { ProjectWhereUniqueInputObjectSchema as ProjectWhereUniqueInputObjectSchema } from './objects/ProjectWhereUniqueInput.schema';
import { ProjectScalarFieldEnumSchema } from './enums/ProjectScalarFieldEnum.schema';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './objects/UserArgs.schema';
import { ProjectFileFindManySchema } from './findManyProjectFile.schema';
import { CompileLogFindManySchema } from './findManyCompileLog.schema';
import { ProjectCountOutputTypeArgsObjectSchema as ProjectCountOutputTypeArgsObjectSchema } from './objects/ProjectCountOutputTypeArgs.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ProjectFindFirstOrThrowSelectSchema: z.ZodType<Prisma.ProjectSelect> = z.object({
    id: z.boolean().optional(),
    title: z.boolean().optional(),
    description: z.boolean().optional(),
    ownerId: z.boolean().optional(),
    template: z.boolean().optional(),
    compilerEngine: z.boolean().optional(),
    status: z.boolean().optional(),
    lastCompiledAt: z.boolean().optional(),
    hasPdf: z.boolean().optional(),
    storageBytes: z.boolean().optional(),
    compilationCount: z.boolean().optional(),
    tags: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    owner: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
    files: z.union([z.boolean(), z.lazy(() => ProjectFileFindManySchema)]).optional(),
    compileLogs: z.union([z.boolean(), z.lazy(() => CompileLogFindManySchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => ProjectCountOutputTypeArgsObjectSchema)]).optional()
  }).strict() as unknown as z.ZodType<Prisma.ProjectSelect>;

export const ProjectFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    title: z.boolean().optional(),
    description: z.boolean().optional(),
    ownerId: z.boolean().optional(),
    template: z.boolean().optional(),
    compilerEngine: z.boolean().optional(),
    status: z.boolean().optional(),
    lastCompiledAt: z.boolean().optional(),
    hasPdf: z.boolean().optional(),
    storageBytes: z.boolean().optional(),
    compilationCount: z.boolean().optional(),
    tags: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    owner: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
    files: z.union([z.boolean(), z.lazy(() => ProjectFileFindManySchema)]).optional(),
    compileLogs: z.union([z.boolean(), z.lazy(() => CompileLogFindManySchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => ProjectCountOutputTypeArgsObjectSchema)]).optional()
  }).strict();

export const ProjectFindFirstOrThrowSchema: z.ZodType<Prisma.ProjectFindFirstOrThrowArgs> = z.object({ select: ProjectFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => ProjectIncludeObjectSchema.optional()), orderBy: z.union([ProjectOrderByWithRelationInputObjectSchema, ProjectOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProjectWhereInputObjectSchema.optional(), cursor: ProjectWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ProjectScalarFieldEnumSchema, ProjectScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ProjectFindFirstOrThrowArgs>;

export const ProjectFindFirstOrThrowZodSchema = z.object({ select: ProjectFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => ProjectIncludeObjectSchema.optional()), orderBy: z.union([ProjectOrderByWithRelationInputObjectSchema, ProjectOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProjectWhereInputObjectSchema.optional(), cursor: ProjectWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ProjectScalarFieldEnumSchema, ProjectScalarFieldEnumSchema.array()]).optional() }).strict();