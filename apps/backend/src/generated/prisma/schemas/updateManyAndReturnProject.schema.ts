import type { Prisma } from '../browser';
import * as z from 'zod';
import { ProjectSelectObjectSchema as ProjectSelectObjectSchema } from './objects/ProjectSelect.schema';
import { ProjectUpdateManyMutationInputObjectSchema as ProjectUpdateManyMutationInputObjectSchema } from './objects/ProjectUpdateManyMutationInput.schema';
import { ProjectWhereInputObjectSchema as ProjectWhereInputObjectSchema } from './objects/ProjectWhereInput.schema';

export const ProjectUpdateManyAndReturnSchema: z.ZodType<Prisma.ProjectUpdateManyAndReturnArgs> = z.object({ select: ProjectSelectObjectSchema.optional(), data: ProjectUpdateManyMutationInputObjectSchema, where: ProjectWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ProjectUpdateManyAndReturnArgs>;

export const ProjectUpdateManyAndReturnZodSchema = z.object({ select: ProjectSelectObjectSchema.optional(), data: ProjectUpdateManyMutationInputObjectSchema, where: ProjectWhereInputObjectSchema.optional() }).strict();