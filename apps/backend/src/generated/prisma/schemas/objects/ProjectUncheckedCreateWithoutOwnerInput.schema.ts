import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectCreatetagsInputObjectSchema as ProjectCreatetagsInputObjectSchema } from './ProjectCreatetagsInput.schema';
import { ProjectFileUncheckedCreateNestedManyWithoutProjectInputObjectSchema as ProjectFileUncheckedCreateNestedManyWithoutProjectInputObjectSchema } from './ProjectFileUncheckedCreateNestedManyWithoutProjectInput.schema';
import { CompileLogUncheckedCreateNestedManyWithoutProjectInputObjectSchema as CompileLogUncheckedCreateNestedManyWithoutProjectInputObjectSchema } from './CompileLogUncheckedCreateNestedManyWithoutProjectInput.schema'

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
  updatedAt: z.coerce.date().optional(),
  files: z.lazy(() => ProjectFileUncheckedCreateNestedManyWithoutProjectInputObjectSchema).optional(),
  compileLogs: z.lazy(() => CompileLogUncheckedCreateNestedManyWithoutProjectInputObjectSchema).optional()
}).strict();
export const ProjectUncheckedCreateWithoutOwnerInputObjectSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutOwnerInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectUncheckedCreateWithoutOwnerInput>;
export const ProjectUncheckedCreateWithoutOwnerInputObjectZodSchema = makeSchema();
