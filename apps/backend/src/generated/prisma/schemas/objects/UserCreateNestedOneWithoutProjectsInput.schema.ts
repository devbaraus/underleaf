import * as z from 'zod';
import type { Prisma } from '../../browser';
import { UserCreateWithoutProjectsInputObjectSchema as UserCreateWithoutProjectsInputObjectSchema } from './UserCreateWithoutProjectsInput.schema';
import { UserUncheckedCreateWithoutProjectsInputObjectSchema as UserUncheckedCreateWithoutProjectsInputObjectSchema } from './UserUncheckedCreateWithoutProjectsInput.schema';
import { UserCreateOrConnectWithoutProjectsInputObjectSchema as UserCreateOrConnectWithoutProjectsInputObjectSchema } from './UserCreateOrConnectWithoutProjectsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutProjectsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutProjectsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProjectsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutProjectsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutProjectsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutProjectsInput>;
export const UserCreateNestedOneWithoutProjectsInputObjectZodSchema = makeSchema();
