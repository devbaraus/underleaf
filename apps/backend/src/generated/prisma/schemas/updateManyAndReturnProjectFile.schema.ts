import type { Prisma } from '../browser';
import * as z from 'zod';
import { ProjectFileSelectObjectSchema as ProjectFileSelectObjectSchema } from './objects/ProjectFileSelect.schema';
import { ProjectFileUpdateManyMutationInputObjectSchema as ProjectFileUpdateManyMutationInputObjectSchema } from './objects/ProjectFileUpdateManyMutationInput.schema';
import { ProjectFileWhereInputObjectSchema as ProjectFileWhereInputObjectSchema } from './objects/ProjectFileWhereInput.schema';

export const ProjectFileUpdateManyAndReturnSchema: z.ZodType<Prisma.ProjectFileUpdateManyAndReturnArgs> = z.object({ select: ProjectFileSelectObjectSchema.optional(), data: ProjectFileUpdateManyMutationInputObjectSchema, where: ProjectFileWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ProjectFileUpdateManyAndReturnArgs>;

export const ProjectFileUpdateManyAndReturnZodSchema = z.object({ select: ProjectFileSelectObjectSchema.optional(), data: ProjectFileUpdateManyMutationInputObjectSchema, where: ProjectFileWhereInputObjectSchema.optional() }).strict();