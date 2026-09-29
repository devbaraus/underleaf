import * as z from 'zod';
import type { Prisma } from '../../browser';
import { SessionCreateNestedManyWithoutUserInputObjectSchema as SessionCreateNestedManyWithoutUserInputObjectSchema } from './SessionCreateNestedManyWithoutUserInput.schema';
import { AccountCreateNestedManyWithoutUserInputObjectSchema as AccountCreateNestedManyWithoutUserInputObjectSchema } from './AccountCreateNestedManyWithoutUserInput.schema';
import { ProjectCreateNestedManyWithoutOwnerInputObjectSchema as ProjectCreateNestedManyWithoutOwnerInputObjectSchema } from './ProjectCreateNestedManyWithoutOwnerInput.schema';
import { AuditLogCreateNestedManyWithoutUserInputObjectSchema as AuditLogCreateNestedManyWithoutUserInputObjectSchema } from './AuditLogCreateNestedManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  emailVerified: z.boolean().optional(),
  image: z.string().optional().nullable(),
  role: z.string().optional(),
  status: z.string().optional(),
  banned: z.boolean().optional().nullable(),
  banReason: z.string().optional().nullable(),
  banExpires: z.coerce.date().optional().nullable(),
  quotaMb: z.number().int().optional(),
  storageUsedMb: z.number().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputObjectSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputObjectSchema).optional(),
  projects: z.lazy(() => ProjectCreateNestedManyWithoutOwnerInputObjectSchema).optional(),
  auditLogs: z.lazy(() => AuditLogCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserCreateWithoutCompileLogsInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutCompileLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutCompileLogsInput>;
export const UserCreateWithoutCompileLogsInputObjectZodSchema = makeSchema();
