import * as z from 'zod';
export const AccountCreateResultSchema = z.object({
  id: z.string(),
  userId: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  password: z.string().nullable().optional(),
  accessToken: z.string().nullable().optional(),
  refreshToken: z.string().nullable().optional(),
  idToken: z.string().nullable().optional(),
  accessTokenExpiresAt: z.date().nullable().optional(),
  refreshTokenExpiresAt: z.date().nullable().optional(),
  scope: z.string().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  user: z.unknown().optional()
});