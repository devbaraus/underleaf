import * as z from 'zod';
// prettier-ignore
export const UserInputSchema = z.object({
    id: z.string(),
    email: z.string(),
    name: z.string(),
    emailVerified: z.boolean(),
    image: z.string().optional().nullable(),
    role: z.string(),
    status: z.string(),
    banned: z.boolean().optional().nullable(),
    banReason: z.string().optional().nullable(),
    banExpires: z.coerce.date().optional().nullable(),
    quotaMb: z.number().int(),
    storageUsedMb: z.number(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    sessions: z.array(z.unknown()),
    accounts: z.array(z.unknown()),
    projects: z.array(z.unknown()),
    compileLogs: z.array(z.unknown()),
    auditLogs: z.array(z.unknown())
}).strict();

export type UserInputType = z.infer<typeof UserInputSchema>;
