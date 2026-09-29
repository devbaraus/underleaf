import type { Prisma } from '../browser';
import * as z from 'zod';
import { ProjectOrderByWithRelationInputObjectSchema as ProjectOrderByWithRelationInputObjectSchema } from './objects/ProjectOrderByWithRelationInput.schema';
import { ProjectWhereInputObjectSchema as ProjectWhereInputObjectSchema } from './objects/ProjectWhereInput.schema';
import { ProjectWhereUniqueInputObjectSchema as ProjectWhereUniqueInputObjectSchema } from './objects/ProjectWhereUniqueInput.schema';
import { ProjectCountAggregateInputObjectSchema as ProjectCountAggregateInputObjectSchema } from './objects/ProjectCountAggregateInput.schema';

export const ProjectCountSchema: z.ZodType<Prisma.ProjectCountArgs> = z.object({ orderBy: z.union([ProjectOrderByWithRelationInputObjectSchema, ProjectOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProjectWhereInputObjectSchema.optional(), cursor: ProjectWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ProjectCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.ProjectCountArgs>;

export const ProjectCountZodSchema = z.object({ orderBy: z.union([ProjectOrderByWithRelationInputObjectSchema, ProjectOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProjectWhereInputObjectSchema.optional(), cursor: ProjectWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ProjectCountAggregateInputObjectSchema ]).optional() }).strict();