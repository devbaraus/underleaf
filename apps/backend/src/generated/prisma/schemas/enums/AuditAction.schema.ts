import * as z from 'zod';

export const AuditActionSchema = z.enum(['CREATE', 'UPDATE', 'DELETE', 'UPSERT'])

export type AuditAction = z.infer<typeof AuditActionSchema>;