import * as z from 'zod';
// prettier-ignore
export const UserModelSchema = z.object({
    id: z.string(),
    email: z.string(),
    name: z.string(),
    emailVerified: z.boolean(),
    image: z.string().nullable(),
    role: z.string(),
    status: z.string(),
    banned: z.boolean().nullable(),
    banReason: z.string().nullable(),
    banExpires: z.date().nullable(),
    quotaMb: z.number().int(),
    storageUsedMb: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
    sessions: z.array(z.unknown()),
    accounts: z.array(z.unknown()),
    projects: z.array(z.unknown()),
    compileLogs: z.array(z.unknown()),
    auditLogs: z.array(z.unknown())
}).strict();

export type UserPureType = z.infer<typeof UserModelSchema>;
