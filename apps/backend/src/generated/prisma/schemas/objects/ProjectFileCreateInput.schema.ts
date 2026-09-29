import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectCreateNestedOneWithoutFilesInputObjectSchema as ProjectCreateNestedOneWithoutFilesInputObjectSchema } from './ProjectCreateNestedOneWithoutFilesInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  path: z.string(),
  content: z.string(),
  isMain: z.boolean().optional(),
  type: z.string().optional(),
  sizeBytes: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  project: z.lazy(() => ProjectCreateNestedOneWithoutFilesInputObjectSchema)
}).strict();
export const ProjectFileCreateInputObjectSchema: z.ZodType<Prisma.ProjectFileCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectFileCreateInput>;
export const ProjectFileCreateInputObjectZodSchema = makeSchema();
