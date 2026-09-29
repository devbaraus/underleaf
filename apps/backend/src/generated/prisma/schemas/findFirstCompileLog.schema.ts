import type { Prisma } from '../browser';
import * as z from 'zod';
import { CompileLogIncludeObjectSchema as CompileLogIncludeObjectSchema } from './objects/CompileLogInclude.schema';
import { CompileLogOrderByWithRelationInputObjectSchema as CompileLogOrderByWithRelationInputObjectSchema } from './objects/CompileLogOrderByWithRelationInput.schema';
import { CompileLogWhereInputObjectSchema as CompileLogWhereInputObjectSchema } from './objects/CompileLogWhereInput.schema';
import { CompileLogWhereUniqueInputObjectSchema as CompileLogWhereUniqueInputObjectSchema } from './objects/CompileLogWhereUniqueInput.schema';
import { CompileLogScalarFieldEnumSchema } from './enums/CompileLogScalarFieldEnum.schema';
import { ProjectArgsObjectSchema as ProjectArgsObjectSchema } from './objects/ProjectArgs.schema';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './objects/UserArgs.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CompileLogFindFirstSelectSchema: z.ZodType<Prisma.CompileLogSelect> = z.object({
    id: z.boolean().optional(),
    projectId: z.boolean().optional(),
    userId: z.boolean().optional(),
    success: z.boolean().optional(),
    durationMs: z.boolean().optional(),
    errors: z.boolean().optional(),
    rawOutput: z.boolean().optional(),
    engine: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    project: z.union([z.boolean(), z.lazy(() => ProjectArgsObjectSchema)]).optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
  }).strict() as unknown as z.ZodType<Prisma.CompileLogSelect>;

export const CompileLogFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    projectId: z.boolean().optional(),
    userId: z.boolean().optional(),
    success: z.boolean().optional(),
    durationMs: z.boolean().optional(),
    errors: z.boolean().optional(),
    rawOutput: z.boolean().optional(),
    engine: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    project: z.union([z.boolean(), z.lazy(() => ProjectArgsObjectSchema)]).optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
  }).strict();

export const CompileLogFindFirstSchema: z.ZodType<Prisma.CompileLogFindFirstArgs> = z.object({ select: CompileLogFindFirstSelectSchema.optional(), include: z.lazy(() => CompileLogIncludeObjectSchema.optional()), orderBy: z.union([CompileLogOrderByWithRelationInputObjectSchema, CompileLogOrderByWithRelationInputObjectSchema.array()]).optional(), where: CompileLogWhereInputObjectSchema.optional(), cursor: CompileLogWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CompileLogScalarFieldEnumSchema, CompileLogScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.CompileLogFindFirstArgs>;

export const CompileLogFindFirstZodSchema = z.object({ select: CompileLogFindFirstSelectSchema.optional(), include: z.lazy(() => CompileLogIncludeObjectSchema.optional()), orderBy: z.union([CompileLogOrderByWithRelationInputObjectSchema, CompileLogOrderByWithRelationInputObjectSchema.array()]).optional(), where: CompileLogWhereInputObjectSchema.optional(), cursor: CompileLogWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CompileLogScalarFieldEnumSchema, CompileLogScalarFieldEnumSchema.array()]).optional() }).strict();