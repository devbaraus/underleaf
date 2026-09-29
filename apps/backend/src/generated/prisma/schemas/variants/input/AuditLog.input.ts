import * as z from 'zod';
import { AuditActionSchema } from '../../enums/AuditAction.schema';
// prettier-ignore
export const AuditLogInputSchema = z.object({
    id: z.string(),
    model: z.string(),
    action: AuditActionSchema,
    recordId: z.string().optional().nullable(),
    userId: z.string().optional().nullable(),
    after: z.unknown().optional().nullable(),
    createdAt: z.coerce.date(),
    user: z.unknown().optional().nullable()
}).strict();

export type AuditLogInputType = z.infer<typeof AuditLogInputSchema>;
