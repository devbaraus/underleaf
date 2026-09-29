import { prismaAdapter } from 'better-auth/adapters/prisma'
import { betterAuth } from 'better-auth'
import { admin, bearer, openAPI } from 'better-auth/plugins'
import type { OpenAPIV3 } from 'openapi-types'

import { prisma } from './db'
import { env } from './env'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  trustedOrigins: env.CORS_ORIGIN,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: true,
  },
  user: {
    additionalFields: {
      role: { type: 'string', required: false, defaultValue: 'editor' },
      status: { type: 'string', required: false, defaultValue: 'active' },
      quotaMb: { type: 'number', required: false, defaultValue: 500 },
      storageUsedMb: { type: 'number', required: false, defaultValue: 0 },
    },
  },
  plugins: [
    bearer(),
    admin(),
    openAPI({
      disableDefaultReference: true,
    }),
  ],
})

/**
 * Paths + components do Better Auth prefixados para OpenAPI do Elysia.
 */
export async function authOpenAPI(prefix = '/api/auth') {
  const { paths, components } = await auth.api.generateOpenAPISchema()

  return {
    components: components as OpenAPIV3.ComponentsObject,
    paths: Object.fromEntries(
      Object.entries(paths).map(([path, operations]) => [
        prefix + path,
        Object.fromEntries(
          Object.entries(operations).map(([method, operation]) => [
            method,
            { ...operation, tags: ['Auth'] },
          ]),
        ),
      ]),
    ),
  }
}
