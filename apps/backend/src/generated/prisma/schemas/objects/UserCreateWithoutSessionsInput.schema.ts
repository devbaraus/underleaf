import * as z from 'zod';
import type { Prisma } from '../../browser';
import { AccountCreateNestedManyWithoutUserInputObjectSchema as AccountCreateNestedManyWithoutUserInputObjectSchema } from './AccountCreateNestedManyWithoutUserInput.schema';
import { ProjectCreateNestedManyWithoutOwnerInputObjectSchema as ProjectCreateNestedManyWithoutOwnerInputObjectSchema } from './ProjectCreateNestedManyWithoutOwnerInput.schema';
import { CompileLogCreateNestedManyWithoutUserInputObjectSchema as CompileLogCreateNestedManyWithoutUserInputObjectSchema } from './CompileLogCreateNestedManyWithoutUserInput.schema';
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
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputObjectSchema).optional(),
  projects: z.lazy(() => ProjectCreateNestedManyWithoutOwnerInputObjectSchema).optional(),
  compileLogs: z.lazy(() => CompileLogCreateNestedManyWithoutUserInputObjectSchema).optional(),
  auditLogs: z.lazy(() => AuditLogCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserCreateWithoutSessionsInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutSessionsInput>;
export const UserCreateWithoutSessionsInputObjectZodSchema = makeSchema();
