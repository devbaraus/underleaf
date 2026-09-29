import * as z from 'zod';
export const UserGroupByResultSchema = z.array(z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  name: z.string().optional(),
  emailVerified: z.boolean().optional(),
  image: z.string().nullable().optional(),
  role: z.string().optional(),
  status: z.string().optional(),
  banned: z.boolean().nullable().optional(),
  banReason: z.string().nullable().optional(),
  banExpires: z.date().nullable().optional(),
  quotaMb: z.number().int().optional(),
  storageUsedMb: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  _count: z.union([z.number(), z.object({
    id: z.number().optional(),
    email: z.number().optional(),
    name: z.number().optional(),
    emailVerified: z.number().optional(),
    image: z.number().optional(),
    role: z.number().optional(),
    status: z.number().optional(),
    banned: z.number().optional(),
    banReason: z.number().optional(),
    banExpires: z.number().optional(),
    quotaMb: z.number().optional(),
    storageUsedMb: z.number().optional(),
    createdAt: z.number().optional(),
    updatedAt: z.number().optional(),
    _all: z.number().optional()
  })]).optional(),
  _sum: z.object({
    quotaMb: z.number().nullable().optional(),
    storageUsedMb: z.number().nullable().optional()
  }).nullable().optional(),
  _avg: z.object({
    quotaMb: z.number().nullable().optional(),
    storageUsedMb: z.number().nullable().optional()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable().optional(),
    email: z.string().nullable().optional(),
    name: z.string().nullable().optional(),
    emailVerified: z.boolean().nullable().optional(),
    image: z.string().nullable().optional(),
    role: z.string().nullable().optional(),
    status: z.string().nullable().optional(),
    banned: z.boolean().nullable().optional(),
    banReason: z.string().nullable().optional(),
    banExpires: z.date().nullable().optional(),
    quotaMb: z.number().int().nullable().optional(),
    storageUsedMb: z.number().nullable().optional(),
    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable().optional(),
    email: z.string().nullable().optional(),
    name: z.string().nullable().optional(),
    emailVerified: z.boolean().nullable().optional(),
    image: z.string().nullable().optional(),
    role: z.string().nullable().optional(),
    status: z.string().nullable().optional(),
    banned: z.boolean().nullable().optional(),
    banReason: z.string().nullable().optional(),
    banExpires: z.date().nullable().optional(),
    quotaMb: z.number().int().nullable().optional(),
    storageUsedMb: z.number().nullable().optional(),
    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional()
  }).nullable().optional()
}));