import * as z from 'zod';
import type { Prisma } from '../../browser';
import { AuditActionSchema } from '../enums/AuditAction.schema'

const makeSchema = () => z.object({
  set: AuditActionSchema.optional()
}).strict();
export const EnumAuditActionFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumAuditActionFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumAuditActionFieldUpdateOperationsInput>;
export const EnumAuditActionFieldUpdateOperationsInputObjectZodSchema = makeSchema();
