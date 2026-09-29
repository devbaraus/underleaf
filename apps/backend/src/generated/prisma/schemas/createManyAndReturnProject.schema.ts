import type { Prisma } from '../browser';
import * as z from 'zod';
import { ProjectSelectObjectSchema as ProjectSelectObjectSchema } from './objects/ProjectSelect.schema';
import { ProjectCreateManyInputObjectSchema as ProjectCreateManyInputObjectSchema } from './objects/ProjectCreateManyInput.schema';

export const ProjectCreateManyAndReturnSchema: z.ZodType<Prisma.ProjectCreateManyAndReturnArgs> = z.object({ select: ProjectSelectObjectSchema.optional(), data: z.union([ ProjectCreateManyInputObjectSchema, z.array(ProjectCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ProjectCreateManyAndReturnArgs>;

export const ProjectCreateManyAndReturnZodSchema = z.object({ select: ProjectSelectObjectSchema.optional(), data: z.union([ ProjectCreateManyInputObjectSchema, z.array(ProjectCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();