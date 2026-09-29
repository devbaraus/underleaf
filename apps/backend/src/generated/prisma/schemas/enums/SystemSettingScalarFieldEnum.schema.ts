import * as z from 'zod';

export const SystemSettingScalarFieldEnumSchema = z.enum(['key', 'value', 'description', 'updatedAt'])

export type SystemSettingScalarFieldEnum = z.infer<typeof SystemSettingScalarFieldEnumSchema>;