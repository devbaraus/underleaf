import * as z from 'zod';
import type { Prisma } from '../../browser';
import { SessionFindManySchema as SessionFindManySchema } from '../findManySession.schema';
import { AccountFindManySchema as AccountFindManySchema } from '../findManyAccount.schema';
import { ProjectFindManySchema as ProjectFindManySchema } from '../findManyProject.schema';
import { CompileLogFindManySchema as CompileLogFindManySchema } from '../findManyCompileLog.schema';
import { AuditLogFindManySchema as AuditLogFindManySchema } from '../findManyAuditLog.schema';
import { UserCountOutputTypeArgsObjectSchema as UserCountOutputTypeArgsObjectSchema } from './UserCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  role: z.boolean().optional(),
  status: z.boolean().optional(),
  banned: z.boolean().optional(),
  banReason: z.boolean().optional(),
  banExpires: z.boolean().optional(),
  quotaMb: z.boolean().optional(),
  storageUsedMb: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  sessions: z.union([z.boolean(), z.lazy(() => SessionFindManySchema)]).optional(),
  accounts: z.union([z.boolean(), z.lazy(() => AccountFindManySchema)]).optional(),
  projects: z.union([z.boolean(), z.lazy(() => ProjectFindManySchema)]).optional(),
  compileLogs: z.union([z.boolean(), z.lazy(() => CompileLogFindManySchema)]).optional(),
  auditLogs: z.union([z.boolean(), z.lazy(() => AuditLogFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const UserSelectObjectSchema: z.ZodType<Prisma.UserSelect> = makeSchema() as unknown as z.ZodType<Prisma.UserSelect>;
export const UserSelectObjectZodSchema = makeSchema();
