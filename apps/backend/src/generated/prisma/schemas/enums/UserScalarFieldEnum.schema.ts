import * as z from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id', 'email', 'name', 'emailVerified', 'image', 'role', 'status', 'banned', 'banReason', 'banExpires', 'quotaMb', 'storageUsedMb', 'createdAt', 'updatedAt'])

export type UserScalarFieldEnum = z.infer<typeof UserScalarFieldEnumSchema>;