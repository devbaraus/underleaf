import * as z from 'zod';
import { AuditActionSchema } from '../../enums/AuditAction.schema';
// prettier-ignore
export const AuditLogResultSchema = z.object({
    id: z.string(),
    model: z.string(),
    action: AuditActionSchema,
    recordId: z.string().nullable(),
    userId: z.string().nullable(),
    after: z.unknown().nullable(),
    createdAt: z.date(),
    user: z.unknown().nullable()
}).strict();

export type AuditLogResultType = z.infer<typeof AuditLogResultSchema>;
