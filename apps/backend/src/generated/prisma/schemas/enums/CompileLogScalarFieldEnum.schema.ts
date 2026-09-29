import * as z from 'zod';

export const CompileLogScalarFieldEnumSchema = z.enum(['id', 'projectId', 'userId', 'success', 'durationMs', 'errors', 'rawOutput', 'engine', 'createdAt'])

export type CompileLogScalarFieldEnum = z.infer<typeof CompileLogScalarFieldEnumSchema>;