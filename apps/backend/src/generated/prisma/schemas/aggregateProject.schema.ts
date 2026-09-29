import type { Prisma } from '../browser';
import * as z from 'zod';
import { ProjectOrderByWithRelationInputObjectSchema as ProjectOrderByWithRelationInputObjectSchema } from './objects/ProjectOrderByWithRelationInput.schema';
import { ProjectWhereInputObjectSchema as ProjectWhereInputObjectSchema } from './objects/ProjectWhereInput.schema';
import { ProjectWhereUniqueInputObjectSchema as ProjectWhereUniqueInputObjectSchema } from './objects/ProjectWhereUniqueInput.schema';
import { ProjectCountAggregateInputObjectSchema as ProjectCountAggregateInputObjectSchema } from './objects/ProjectCountAggregateInput.schema';
import { ProjectMinAggregateInputObjectSchema as ProjectMinAggregateInputObjectSchema } from './objects/ProjectMinAggregateInput.schema';
import { ProjectMaxAggregateInputObjectSchema as ProjectMaxAggregateInputObjectSchema } from './objects/ProjectMaxAggregateInput.schema';
import { ProjectAvgAggregateInputObjectSchema as ProjectAvgAggregateInputObjectSchema } from './objects/ProjectAvgAggregateInput.schema';
import { ProjectSumAggregateInputObjectSchema as ProjectSumAggregateInputObjectSchema } from './objects/ProjectSumAggregateInput.schema';

export const ProjectAggregateSchema: z.ZodType<Prisma.ProjectAggregateArgs> = z.object({ orderBy: z.union([ProjectOrderByWithRelationInputObjectSchema, ProjectOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProjectWhereInputObjectSchema.optional(), cursor: ProjectWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), ProjectCountAggregateInputObjectSchema ]).optional(), _min: ProjectMinAggregateInputObjectSchema.optional(), _max: ProjectMaxAggregateInputObjectSchema.optional(), _avg: ProjectAvgAggregateInputObjectSchema.optional(), _sum: ProjectSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ProjectAggregateArgs>;

export const ProjectAggregateZodSchema = z.object({ orderBy: z.union([ProjectOrderByWithRelationInputObjectSchema, ProjectOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProjectWhereInputObjectSchema.optional(), cursor: ProjectWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), ProjectCountAggregateInputObjectSchema ]).optional(), _min: ProjectMinAggregateInputObjectSchema.optional(), _max: ProjectMaxAggregateInputObjectSchema.optional(), _avg: ProjectAvgAggregateInputObjectSchema.optional(), _sum: ProjectSumAggregateInputObjectSchema.optional() }).strict();