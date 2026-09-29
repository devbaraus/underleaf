import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectFileProjectIdPathCompoundUniqueInputObjectSchema as ProjectFileProjectIdPathCompoundUniqueInputObjectSchema } from './ProjectFileProjectIdPathCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  projectId_path: z.lazy(() => ProjectFileProjectIdPathCompoundUniqueInputObjectSchema).optional()
}).strict();
export const ProjectFileWhereUniqueInputObjectSchema: z.ZodType<Prisma.ProjectFileWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectFileWhereUniqueInput>;
export const ProjectFileWhereUniqueInputObjectZodSchema = makeSchema();
