import * as z from 'zod';
import type { Prisma } from '../../browser';
import { UserUpdateWithoutProjectsInputObjectSchema as UserUpdateWithoutProjectsInputObjectSchema } from './UserUpdateWithoutProjectsInput.schema';
import { UserUncheckedUpdateWithoutProjectsInputObjectSchema as UserUncheckedUpdateWithoutProjectsInputObjectSchema } from './UserUncheckedUpdateWithoutProjectsInput.schema';
import { UserCreateWithoutProjectsInputObjectSchema as UserCreateWithoutProjectsInputObjectSchema } from './UserCreateWithoutProjectsInput.schema';
import { UserUncheckedCreateWithoutProjectsInputObjectSchema as UserUncheckedCreateWithoutProjectsInputObjectSchema } from './UserUncheckedCreateWithoutProjectsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutProjectsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutProjectsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutProjectsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutProjectsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutProjectsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutProjectsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutProjectsInput>;
export const UserUpsertWithoutProjectsInputObjectZodSchema = makeSchema();
