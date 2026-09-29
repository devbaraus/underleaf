import * as z from 'zod';
export const AccountFindManyResultSchema = z.object({
  data: z.array(z.object({
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
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});