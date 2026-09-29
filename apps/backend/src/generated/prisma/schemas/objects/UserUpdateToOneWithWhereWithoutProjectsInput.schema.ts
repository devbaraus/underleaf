import * as z from 'zod';
import type { Prisma } from '../../browser';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutProjectsInputObjectSchema as UserUpdateWithoutProjectsInputObjectSchema } from './UserUpdateWithoutProjectsInput.schema';
import { UserUncheckedUpdateWithoutProjectsInputObjectSchema as UserUncheckedUpdateWithoutProjectsInputObjectSchema } from './UserUncheckedUpdateWithoutProjectsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutProjectsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutProjectsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutProjectsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutProjectsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutProjectsInput>;
export const UserUpdateToOneWithWhereWithoutProjectsInputObjectZodSchema = makeSchema();
