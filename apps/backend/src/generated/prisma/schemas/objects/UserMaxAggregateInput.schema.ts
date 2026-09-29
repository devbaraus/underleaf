import * as z from 'zod';
import type { Prisma } from '../../browser';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  email: z.literal(true).optional(),
  name: z.literal(true).optional(),
  emailVerified: z.literal(true).optional(),
  image: z.literal(true).optional(),
  role: z.literal(true).optional(),
  status: z.literal(true).optional(),
  banned: z.literal(true).optional(),
  banReason: z.literal(true).optional(),
  banExpires: z.literal(true).optional(),
  quotaMb: z.literal(true).optional(),
  storageUsedMb: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const UserMaxAggregateInputObjectSchema: z.ZodType<Prisma.UserMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.UserMaxAggregateInputType>;
export const UserMaxAggregateInputObjectZodSchema = makeSchema();
