import * as z from 'zod';
import type { Prisma } from '../../browser';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { ProjectFileOrderByRelationAggregateInputObjectSchema as ProjectFileOrderByRelationAggregateInputObjectSchema } from './ProjectFileOrderByRelationAggregateInput.schema';
import { CompileLogOrderByRelationAggregateInputObjectSchema as CompileLogOrderByRelationAggregateInputObjectSchema } from './CompileLogOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  ownerId: SortOrderSchema.optional(),
  template: SortOrderSchema.optional(),
  compilerEngine: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  lastCompiledAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  hasPdf: SortOrderSchema.optional(),
  storageBytes: SortOrderSchema.optional(),
  compilationCount: SortOrderSchema.optional(),
  tags: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  owner: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  files: z.lazy(() => ProjectFileOrderByRelationAggregateInputObjectSchema).optional(),
  compileLogs: z.lazy(() => CompileLogOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const ProjectOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ProjectOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectOrderByWithRelationInput>;
export const ProjectOrderByWithRelationInputObjectZodSchema = makeSchema();
