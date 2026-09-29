import type { Prisma } from '../browser';
import * as z from 'zod';
import { ProjectFileOrderByWithRelationInputObjectSchema as ProjectFileOrderByWithRelationInputObjectSchema } from './objects/ProjectFileOrderByWithRelationInput.schema';
import { ProjectFileWhereInputObjectSchema as ProjectFileWhereInputObjectSchema } from './objects/ProjectFileWhereInput.schema';
import { ProjectFileWhereUniqueInputObjectSchema as ProjectFileWhereUniqueInputObjectSchema } from './objects/ProjectFileWhereUniqueInput.schema';
import { ProjectFileCountAggregateInputObjectSchema as ProjectFileCountAggregateInputObjectSchema } from './objects/ProjectFileCountAggregateInput.schema';

export const ProjectFileCountSchema: z.ZodType<Prisma.ProjectFileCountArgs> = z.object({ orderBy: z.union([ProjectFileOrderByWithRelationInputObjectSchema, ProjectFileOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProjectFileWhereInputObjectSchema.optional(), cursor: ProjectFileWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ProjectFileCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.ProjectFileCountArgs>;

export const ProjectFileCountZodSchema = z.object({ orderBy: z.union([ProjectFileOrderByWithRelationInputObjectSchema, ProjectFileOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProjectFileWhereInputObjectSchema.optional(), cursor: ProjectFileWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ProjectFileCountAggregateInputObjectSchema ]).optional() }).strict();