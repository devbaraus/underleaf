import type { Prisma } from '../browser';
import * as z from 'zod';
import { ProjectCreateManyInputObjectSchema as ProjectCreateManyInputObjectSchema } from './objects/ProjectCreateManyInput.schema';

export const ProjectCreateManySchema: z.ZodType<Prisma.ProjectCreateManyArgs> = z.object({ data: z.union([ ProjectCreateManyInputObjectSchema, z.array(ProjectCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ProjectCreateManyArgs>;

export const ProjectCreateManyZodSchema = z.object({ data: z.union([ ProjectCreateManyInputObjectSchema, z.array(ProjectCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();