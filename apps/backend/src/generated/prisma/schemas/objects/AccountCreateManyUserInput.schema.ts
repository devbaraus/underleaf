import * as z from 'zod';
import type { Prisma } from '../../browser';


const makeSchema = () => z.object({
  id: z.string().optional(),
  accountId: z.string(),
  providerId: z.string(),
  password: z.string().optional().nullable(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const AccountCreateManyUserInputObjectSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountCreateManyUserInput>;
export const AccountCreateManyUserInputObjectZodSchema = makeSchema();
