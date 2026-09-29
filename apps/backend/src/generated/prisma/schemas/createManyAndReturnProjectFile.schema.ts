import type { Prisma } from '../browser';
import * as z from 'zod';
import { ProjectFileSelectObjectSchema as ProjectFileSelectObjectSchema } from './objects/ProjectFileSelect.schema';
import { ProjectFileCreateManyInputObjectSchema as ProjectFileCreateManyInputObjectSchema } from './objects/ProjectFileCreateManyInput.schema';

export const ProjectFileCreateManyAndReturnSchema: z.ZodType<Prisma.ProjectFileCreateManyAndReturnArgs> = z.object({ select: ProjectFileSelectObjectSchema.optional(), data: z.union([ ProjectFileCreateManyInputObjectSchema, z.array(ProjectFileCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ProjectFileCreateManyAndReturnArgs>;

export const ProjectFileCreateManyAndReturnZodSchema = z.object({ select: ProjectFileSelectObjectSchema.optional(), data: z.union([ ProjectFileCreateManyInputObjectSchema, z.array(ProjectFileCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();