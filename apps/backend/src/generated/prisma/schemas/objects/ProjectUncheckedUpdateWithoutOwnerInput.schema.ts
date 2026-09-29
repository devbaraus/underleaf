import * as z from 'zod';
import type { Prisma } from '../../browser';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { ProjectUpdatetagsInputObjectSchema as ProjectUpdatetagsInputObjectSchema } from './ProjectUpdatetagsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { ProjectFileUncheckedUpdateManyWithoutProjectNestedInputObjectSchema as ProjectFileUncheckedUpdateManyWithoutProjectNestedInputObjectSchema } from './ProjectFileUncheckedUpdateManyWithoutProjectNestedInput.schema';
import { CompileLogUncheckedUpdateManyWithoutProjectNestedInputObjectSchema as CompileLogUncheckedUpdateManyWithoutProjectNestedInputObjectSchema } from './CompileLogUncheckedUpdateManyWithoutProjectNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  template: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  compilerEngine: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  lastCompiledAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  hasPdf: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  storageBytes: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  compilationCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  tags: z.union([z.lazy(() => ProjectUpdatetagsInputObjectSchema), z.string().array()]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  files: z.lazy(() => ProjectFileUncheckedUpdateManyWithoutProjectNestedInputObjectSchema).optional(),
  compileLogs: z.lazy(() => CompileLogUncheckedUpdateManyWithoutProjectNestedInputObjectSchema).optional()
}).strict();
export const ProjectUncheckedUpdateWithoutOwnerInputObjectSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutOwnerInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectUncheckedUpdateWithoutOwnerInput>;
export const ProjectUncheckedUpdateWithoutOwnerInputObjectZodSchema = makeSchema();
