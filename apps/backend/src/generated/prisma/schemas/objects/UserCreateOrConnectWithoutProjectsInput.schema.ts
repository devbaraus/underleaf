import * as z from 'zod';
import type { Prisma } from '../../browser';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutProjectsInputObjectSchema as UserCreateWithoutProjectsInputObjectSchema } from './UserCreateWithoutProjectsInput.schema';
import { UserUncheckedCreateWithoutProjectsInputObjectSchema as UserUncheckedCreateWithoutProjectsInputObjectSchema } from './UserUncheckedCreateWithoutProjectsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutProjectsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutProjectsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutProjectsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutProjectsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutProjectsInput>;
export const UserCreateOrConnectWithoutProjectsInputObjectZodSchema = makeSchema();
