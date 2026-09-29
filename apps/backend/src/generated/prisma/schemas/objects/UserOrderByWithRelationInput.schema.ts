import * as z from 'zod';
import type { Prisma } from '../../browser';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { SessionOrderByRelationAggregateInputObjectSchema as SessionOrderByRelationAggregateInputObjectSchema } from './SessionOrderByRelationAggregateInput.schema';
import { AccountOrderByRelationAggregateInputObjectSchema as AccountOrderByRelationAggregateInputObjectSchema } from './AccountOrderByRelationAggregateInput.schema';
import { ProjectOrderByRelationAggregateInputObjectSchema as ProjectOrderByRelationAggregateInputObjectSchema } from './ProjectOrderByRelationAggregateInput.schema';
import { CompileLogOrderByRelationAggregateInputObjectSchema as CompileLogOrderByRelationAggregateInputObjectSchema } from './CompileLogOrderByRelationAggregateInput.schema';
import { AuditLogOrderByRelationAggregateInputObjectSchema as AuditLogOrderByRelationAggregateInputObjectSchema } from './AuditLogOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  emailVerified: SortOrderSchema.optional(),
  image: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  role: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  banned: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  banReason: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  banExpires: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  quotaMb: SortOrderSchema.optional(),
  storageUsedMb: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputObjectSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputObjectSchema).optional(),
  projects: z.lazy(() => ProjectOrderByRelationAggregateInputObjectSchema).optional(),
  compileLogs: z.lazy(() => CompileLogOrderByRelationAggregateInputObjectSchema).optional(),
  auditLogs: z.lazy(() => AuditLogOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const UserOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrderByWithRelationInput>;
export const UserOrderByWithRelationInputObjectZodSchema = makeSchema();
