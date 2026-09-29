import * as z from 'zod';
import type { Prisma } from '../../browser';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutCompileLogsInputObjectSchema as UserUpdateWithoutCompileLogsInputObjectSchema } from './UserUpdateWithoutCompileLogsInput.schema';
import { UserUncheckedUpdateWithoutCompileLogsInputObjectSchema as UserUncheckedUpdateWithoutCompileLogsInputObjectSchema } from './UserUncheckedUpdateWithoutCompileLogsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutCompileLogsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutCompileLogsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutCompileLogsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCompileLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCompileLogsInput>;
export const UserUpdateToOneWithWhereWithoutCompileLogsInputObjectZodSchema = makeSchema();
