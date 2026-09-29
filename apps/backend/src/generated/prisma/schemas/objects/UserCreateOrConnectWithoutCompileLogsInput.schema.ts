import * as z from 'zod';
import type { Prisma } from '../../browser';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutCompileLogsInputObjectSchema as UserCreateWithoutCompileLogsInputObjectSchema } from './UserCreateWithoutCompileLogsInput.schema';
import { UserUncheckedCreateWithoutCompileLogsInputObjectSchema as UserUncheckedCreateWithoutCompileLogsInputObjectSchema } from './UserUncheckedCreateWithoutCompileLogsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutCompileLogsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCompileLogsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutCompileLogsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCompileLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutCompileLogsInput>;
export const UserCreateOrConnectWithoutCompileLogsInputObjectZodSchema = makeSchema();
