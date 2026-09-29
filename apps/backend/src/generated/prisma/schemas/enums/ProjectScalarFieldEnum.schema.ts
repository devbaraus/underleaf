import * as z from 'zod';

export const ProjectScalarFieldEnumSchema = z.enum(['id', 'title', 'description', 'ownerId', 'template', 'compilerEngine', 'status', 'lastCompiledAt', 'hasPdf', 'storageBytes', 'compilationCount', 'tags', 'createdAt', 'updatedAt'])

export type ProjectScalarFieldEnum = z.infer<typeof ProjectScalarFieldEnumSchema>;