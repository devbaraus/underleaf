import * as z from 'zod';
import type { Prisma } from '../../browser';
import { UserCreateWithoutCompileLogsInputObjectSchema as UserCreateWithoutCompileLogsInputObjectSchema } from './UserCreateWithoutCompileLogsInput.schema';
import { UserUncheckedCreateWithoutCompileLogsInputObjectSchema as UserUncheckedCreateWithoutCompileLogsInputObjectSchema } from './UserUncheckedCreateWithoutCompileLogsInput.schema';
import { UserCreateOrConnectWithoutCompileLogsInputObjectSchema as UserCreateOrConnectWithoutCompileLogsInputObjectSchema } from './UserCreateOrConnectWithoutCompileLogsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutCompileLogsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCompileLogsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCompileLogsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutCompileLogsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCompileLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutCompileLogsInput>;
export const UserCreateNestedOneWithoutCompileLogsInputObjectZodSchema = makeSchema();
