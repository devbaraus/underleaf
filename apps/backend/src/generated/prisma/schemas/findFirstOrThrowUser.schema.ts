import type { Prisma } from '../browser';
import * as z from 'zod';
import { UserIncludeObjectSchema as UserIncludeObjectSchema } from './objects/UserInclude.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './objects/UserOrderByWithRelationInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './objects/UserWhereInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './objects/UserWhereUniqueInput.schema';
import { UserScalarFieldEnumSchema } from './enums/UserScalarFieldEnum.schema';
import { SessionFindManySchema } from './findManySession.schema';
import { AccountFindManySchema } from './findManyAccount.schema';
import { ProjectFindManySchema } from './findManyProject.schema';
import { CompileLogFindManySchema } from './findManyCompileLog.schema';
import { AuditLogFindManySchema } from './findManyAuditLog.schema';
import { UserCountOutputTypeArgsObjectSchema as UserCountOutputTypeArgsObjectSchema } from './objects/UserCountOutputTypeArgs.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserFindFirstOrThrowSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
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
  }).strict() as unknown as z.ZodType<Prisma.UserSelect>;

export const UserFindFirstOrThrowSelectZodSchema = z.object({
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

export const UserFindFirstOrThrowSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({ select: UserFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => UserIncludeObjectSchema.optional()), orderBy: z.union([UserOrderByWithRelationInputObjectSchema, UserOrderByWithRelationInputObjectSchema.array()]).optional(), where: UserWhereInputObjectSchema.optional(), cursor: UserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.UserFindFirstOrThrowArgs>;

export const UserFindFirstOrThrowZodSchema = z.object({ select: UserFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => UserIncludeObjectSchema.optional()), orderBy: z.union([UserOrderByWithRelationInputObjectSchema, UserOrderByWithRelationInputObjectSchema.array()]).optional(), where: UserWhereInputObjectSchema.optional(), cursor: UserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional() }).strict();