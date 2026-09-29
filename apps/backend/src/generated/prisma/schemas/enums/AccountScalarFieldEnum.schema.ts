import * as z from 'zod';

export const AccountScalarFieldEnumSchema = z.enum(['id', 'userId', 'accountId', 'providerId', 'password', 'accessToken', 'refreshToken', 'idToken', 'accessTokenExpiresAt', 'refreshTokenExpiresAt', 'scope', 'createdAt', 'updatedAt'])

export type AccountScalarFieldEnum = z.infer<typeof AccountScalarFieldEnumSchema>;