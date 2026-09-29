import * as z from 'zod';
// prettier-ignore
export const VerificationInputSchema = z.object({
    id: z.string(),
    identifier: z.string(),
    value: z.string(),
    expiresAt: z.coerce.date(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date()
}).strict();

export type VerificationInputType = z.infer<typeof VerificationInputSchema>;
