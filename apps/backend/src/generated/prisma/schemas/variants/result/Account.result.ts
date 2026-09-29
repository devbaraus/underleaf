import * as z from 'zod';
// prettier-ignore
export const AccountResultSchema = z.object({
    id: z.string(),
    userId: z.string(),
    accountId: z.string(),
    providerId: z.string(),
    password: z.string().nullable(),
    accessToken: z.string().nullable(),
    refreshToken: z.string().nullable(),
    idToken: z.string().nullable(),
    accessTokenExpiresAt: z.date().nullable(),
    refreshTokenExpiresAt: z.date().nullable(),
    scope: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    user: z.unknown()
}).strict();

export type AccountResultType = z.infer<typeof AccountResultSchema>;
