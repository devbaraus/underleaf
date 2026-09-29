import * as z from 'zod';
import type { Prisma } from '../../browser';


const makeSchema = () => z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  emailVerified: z.boolean().optional(),
  image: z.string().optional().nullable(),
  role: z.string().optional(),
  status: z.string().optional(),
  banned: z.boolean().optional().nullable(),
  banReason: z.string().optional().nullable(),
  banExpires: z.coerce.date().optional().nullable(),
  quotaMb: z.number().int().optional(),
  storageUsedMb: z.number().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const UserCreateManyInputObjectSchema: z.ZodType<Prisma.UserCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateManyInput>;
export const UserCreateManyInputObjectZodSchema = makeSchema();
