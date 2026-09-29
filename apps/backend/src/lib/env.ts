import z from 'zod'
import { logging } from '@/shared/logger'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z
    .string()
    .default('postgresql://underleaf:underleaf@localhost:5432/underleaf?schema=public'),
  CORS_ORIGIN: z
    .string()
    .default('http://localhost:3000,http://localhost:3333')
    .transform((origins) => origins.split(',').map((origin) => origin.trim())),
  CORS_METHODS: z
    .string()
    .default('GET,POST,PUT,PATCH,DELETE,OPTIONS')
    .transform((methods) => methods.split(',').map((method) => method.trim().toUpperCase())),
  BETTER_AUTH_SECRET: z.string().min(16).default('underleaf-secret-dev-token-change-in-production-123456789'),
  BETTER_AUTH_URL: z.string().default('http://localhost:3333'),
  TECTONIC_BIN_PATH: z.string().default('./bin/tectonic'),
})

const result = envSchema.safeParse(process.env)

if (!result.success) {
  logging.error('Invalid environment variables:', result.error.format())
  process.exit(1)
}

export const env = result.data
