import * as z from 'zod';
import type { Prisma } from '../../browser';
import { SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema as SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './SessionUncheckedCreateNestedManyWithoutUserInput.schema';
import { AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema as AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './AccountUncheckedCreateNestedManyWithoutUserInput.schema';
import { CompileLogUncheckedCreateNestedManyWithoutUserInputObjectSchema as CompileLogUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './CompileLogUncheckedCreateNestedManyWithoutUserInput.schema';
import { AuditLogUncheckedCreateNestedManyWithoutUserInputObjectSchema as AuditLogUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './AuditLogUncheckedCreateNestedManyWithoutUserInput.schema'

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
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  compileLogs: z.lazy(() => CompileLogUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserUncheckedCreateWithoutProjectsInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutProjectsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutProjectsInput>;
export const UserUncheckedCreateWithoutProjectsInputObjectZodSchema = makeSchema();
