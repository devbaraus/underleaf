import * as z from 'zod';
import type { Prisma } from '../../browser';
import { UserCreateWithoutProjectsInputObjectSchema as UserCreateWithoutProjectsInputObjectSchema } from './UserCreateWithoutProjectsInput.schema';
import { UserUncheckedCreateWithoutProjectsInputObjectSchema as UserUncheckedCreateWithoutProjectsInputObjectSchema } from './UserUncheckedCreateWithoutProjectsInput.schema';
import { UserCreateOrConnectWithoutProjectsInputObjectSchema as UserCreateOrConnectWithoutProjectsInputObjectSchema } from './UserCreateOrConnectWithoutProjectsInput.schema';
import { UserUpsertWithoutProjectsInputObjectSchema as UserUpsertWithoutProjectsInputObjectSchema } from './UserUpsertWithoutProjectsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutProjectsInputObjectSchema as UserUpdateToOneWithWhereWithoutProjectsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutProjectsInput.schema';
import { UserUpdateWithoutProjectsInputObjectSchema as UserUpdateWithoutProjectsInputObjectSchema } from './UserUpdateWithoutProjectsInput.schema';
import { UserUncheckedUpdateWithoutProjectsInputObjectSchema as UserUncheckedUpdateWithoutProjectsInputObjectSchema } from './UserUncheckedUpdateWithoutProjectsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutProjectsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutProjectsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProjectsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutProjectsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutProjectsInputObjectSchema), z.lazy(() => UserUpdateWithoutProjectsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutProjectsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutProjectsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutProjectsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutProjectsNestedInput>;
export const UserUpdateOneRequiredWithoutProjectsNestedInputObjectZodSchema = makeSchema();
