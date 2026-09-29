import * as z from 'zod';
import type { Prisma } from '../../browser';
import { SessionFindManySchema as SessionFindManySchema } from '../findManySession.schema';
import { AccountFindManySchema as AccountFindManySchema } from '../findManyAccount.schema';
import { ProjectFindManySchema as ProjectFindManySchema } from '../findManyProject.schema';
import { CompileLogFindManySchema as CompileLogFindManySchema } from '../findManyCompileLog.schema';
import { AuditLogFindManySchema as AuditLogFindManySchema } from '../findManyAuditLog.schema';
import { UserCountOutputTypeArgsObjectSchema as UserCountOutputTypeArgsObjectSchema } from './UserCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  sessions: z.union([z.boolean(), z.lazy(() => SessionFindManySchema)]).optional(),
  accounts: z.union([z.boolean(), z.lazy(() => AccountFindManySchema)]).optional(),
  projects: z.union([z.boolean(), z.lazy(() => ProjectFindManySchema)]).optional(),
  compileLogs: z.union([z.boolean(), z.lazy(() => CompileLogFindManySchema)]).optional(),
  auditLogs: z.union([z.boolean(), z.lazy(() => AuditLogFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const UserIncludeObjectSchema: z.ZodType<Prisma.UserInclude> = makeSchema() as unknown as z.ZodType<Prisma.UserInclude>;
export const UserIncludeObjectZodSchema = makeSchema();
