import * as z from 'zod';
import type { Prisma } from '../../browser';
import { UserUpdateWithoutCompileLogsInputObjectSchema as UserUpdateWithoutCompileLogsInputObjectSchema } from './UserUpdateWithoutCompileLogsInput.schema';
import { UserUncheckedUpdateWithoutCompileLogsInputObjectSchema as UserUncheckedUpdateWithoutCompileLogsInputObjectSchema } from './UserUncheckedUpdateWithoutCompileLogsInput.schema';
import { UserCreateWithoutCompileLogsInputObjectSchema as UserCreateWithoutCompileLogsInputObjectSchema } from './UserCreateWithoutCompileLogsInput.schema';
import { UserUncheckedCreateWithoutCompileLogsInputObjectSchema as UserUncheckedCreateWithoutCompileLogsInputObjectSchema } from './UserUncheckedCreateWithoutCompileLogsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutCompileLogsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutCompileLogsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutCompileLogsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCompileLogsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutCompileLogsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutCompileLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutCompileLogsInput>;
export const UserUpsertWithoutCompileLogsInputObjectZodSchema = makeSchema();
