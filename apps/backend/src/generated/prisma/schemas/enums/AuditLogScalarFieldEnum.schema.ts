import * as z from 'zod';

export const AuditLogScalarFieldEnumSchema = z.enum(['id', 'model', 'action', 'recordId', 'userId', 'after', 'createdAt'])

export type AuditLogScalarFieldEnum = z.infer<typeof AuditLogScalarFieldEnumSchema>;