import * as z from 'zod';
// prettier-ignore
export const SessionInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    token: z.string(),
    expiresAt: z.coerce.date(),
    ipAddress: z.string().optional().nullable(),
    userAgent: z.string().optional().nullable(),
    impersonatedBy: z.string().optional().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    user: z.unknown()
}).strict();

export type SessionInputType = z.infer<typeof SessionInputSchema>;
