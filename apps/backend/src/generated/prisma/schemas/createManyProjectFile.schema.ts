import type { Prisma } from '../browser';
import * as z from 'zod';
import { ProjectFileCreateManyInputObjectSchema as ProjectFileCreateManyInputObjectSchema } from './objects/ProjectFileCreateManyInput.schema';

export const ProjectFileCreateManySchema: z.ZodType<Prisma.ProjectFileCreateManyArgs> = z.object({ data: z.union([ ProjectFileCreateManyInputObjectSchema, z.array(ProjectFileCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ProjectFileCreateManyArgs>;

export const ProjectFileCreateManyZodSchema = z.object({ data: z.union([ ProjectFileCreateManyInputObjectSchema, z.array(ProjectFileCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();