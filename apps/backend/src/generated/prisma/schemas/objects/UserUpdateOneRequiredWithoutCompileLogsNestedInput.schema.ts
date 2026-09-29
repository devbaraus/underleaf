import * as z from 'zod';
import type { Prisma } from '../../browser';
import { UserCreateWithoutCompileLogsInputObjectSchema as UserCreateWithoutCompileLogsInputObjectSchema } from './UserCreateWithoutCompileLogsInput.schema';
import { UserUncheckedCreateWithoutCompileLogsInputObjectSchema as UserUncheckedCreateWithoutCompileLogsInputObjectSchema } from './UserUncheckedCreateWithoutCompileLogsInput.schema';
import { UserCreateOrConnectWithoutCompileLogsInputObjectSchema as UserCreateOrConnectWithoutCompileLogsInputObjectSchema } from './UserCreateOrConnectWithoutCompileLogsInput.schema';
import { UserUpsertWithoutCompileLogsInputObjectSchema as UserUpsertWithoutCompileLogsInputObjectSchema } from './UserUpsertWithoutCompileLogsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutCompileLogsInputObjectSchema as UserUpdateToOneWithWhereWithoutCompileLogsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutCompileLogsInput.schema';
import { UserUpdateWithoutCompileLogsInputObjectSchema as UserUpdateWithoutCompileLogsInputObjectSchema } from './UserUpdateWithoutCompileLogsInput.schema';
import { UserUncheckedUpdateWithoutCompileLogsInputObjectSchema as UserUncheckedUpdateWithoutCompileLogsInputObjectSchema } from './UserUncheckedUpdateWithoutCompileLogsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutCompileLogsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCompileLogsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCompileLogsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCompileLogsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutCompileLogsInputObjectSchema), z.lazy(() => UserUpdateWithoutCompileLogsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutCompileLogsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutCompileLogsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCompileLogsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutCompileLogsNestedInput>;
export const UserUpdateOneRequiredWithoutCompileLogsNestedInputObjectZodSchema = makeSchema();
