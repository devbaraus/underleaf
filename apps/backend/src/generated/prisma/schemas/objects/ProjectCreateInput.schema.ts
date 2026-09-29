import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectCreatetagsInputObjectSchema as ProjectCreatetagsInputObjectSchema } from './ProjectCreatetagsInput.schema';
import { UserCreateNestedOneWithoutProjectsInputObjectSchema as UserCreateNestedOneWithoutProjectsInputObjectSchema } from './UserCreateNestedOneWithoutProjectsInput.schema';
import { ProjectFileCreateNestedManyWithoutProjectInputObjectSchema as ProjectFileCreateNestedManyWithoutProjectInputObjectSchema } from './ProjectFileCreateNestedManyWithoutProjectInput.schema';
import { CompileLogCreateNestedManyWithoutProjectInputObjectSchema as CompileLogCreateNestedManyWithoutProjectInputObjectSchema } from './CompileLogCreateNestedManyWithoutProjectInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  template: z.string().optional(),
  compilerEngine: z.string().optional(),
  status: z.string().optional(),
  lastCompiledAt: z.coerce.date().optional().nullable(),
  hasPdf: z.boolean().optional(),
  storageBytes: z.number().int().optional(),
  compilationCount: z.number().int().optional(),
  tags: z.union([z.lazy(() => ProjectCreatetagsInputObjectSchema), z.string().array()]).optional(),
  createdAt: z.coerce.date().optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutProjectsInputObjectSchema),
  files: z.lazy(() => ProjectFileCreateNestedManyWithoutProjectInputObjectSchema).optional(),
  compileLogs: z.lazy(() => CompileLogCreateNestedManyWithoutProjectInputObjectSchema).optional()
}).strict();
export const ProjectCreateInputObjectSchema: z.ZodType<Prisma.ProjectCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectCreateInput>;
export const ProjectCreateInputObjectZodSchema = makeSchema();
