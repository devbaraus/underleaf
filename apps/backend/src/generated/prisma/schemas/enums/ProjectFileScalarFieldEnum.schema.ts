import * as z from 'zod';

export const ProjectFileScalarFieldEnumSchema = z.enum(['id', 'projectId', 'name', 'path', 'content', 'isMain', 'type', 'sizeBytes', 'createdAt', 'updatedAt'])

export type ProjectFileScalarFieldEnum = z.infer<typeof ProjectFileScalarFieldEnumSchema>;