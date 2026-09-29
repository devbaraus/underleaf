import * as z from 'zod';
// prettier-ignore
export const AccountInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    accountId: z.string(),
    providerId: z.string(),
    password: z.string().optional().nullable(),
    accessToken: z.string().optional().nullable(),
    refreshToken: z.string().optional().nullable(),
    idToken: z.string().optional().nullable(),
    accessTokenExpiresAt: z.coerce.date().optional().nullable(),
    refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
    scope: z.string().optional().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    user: z.unknown()
}).strict();

export type AccountInputType = z.infer<typeof AccountInputSchema>;
