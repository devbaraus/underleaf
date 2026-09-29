import * as z from 'zod';
import type { Prisma } from '../../browser';
import { UserCountOutputTypeCountSessionsArgsObjectSchema as UserCountOutputTypeCountSessionsArgsObjectSchema } from './UserCountOutputTypeCountSessionsArgs.schema';
import { UserCountOutputTypeCountAccountsArgsObjectSchema as UserCountOutputTypeCountAccountsArgsObjectSchema } from './UserCountOutputTypeCountAccountsArgs.schema';
import { UserCountOutputTypeCountProjectsArgsObjectSchema as UserCountOutputTypeCountProjectsArgsObjectSchema } from './UserCountOutputTypeCountProjectsArgs.schema';
import { UserCountOutputTypeCountCompileLogsArgsObjectSchema as UserCountOutputTypeCountCompileLogsArgsObjectSchema } from './UserCountOutputTypeCountCompileLogsArgs.schema';
import { UserCountOutputTypeCountAuditLogsArgsObjectSchema as UserCountOutputTypeCountAuditLogsArgsObjectSchema } from './UserCountOutputTypeCountAuditLogsArgs.schema'

const makeSchema = () => z.object({
  sessions: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountSessionsArgsObjectSchema)]).optional(),
  accounts: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountAccountsArgsObjectSchema)]).optional(),
  projects: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountProjectsArgsObjectSchema)]).optional(),
  compileLogs: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountCompileLogsArgsObjectSchema)]).optional(),
  auditLogs: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountAuditLogsArgsObjectSchema)]).optional()
}).strict();
export const UserCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.UserCountOutputTypeSelect>;
export const UserCountOutputTypeSelectObjectZodSchema = makeSchema();
