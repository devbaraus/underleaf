import path from 'node:path'

import { defineConfig } from '@kubb/core'
import { pluginOas } from '@kubb/plugin-oas'
import { createGenerator } from '@kubb/plugin-oas/generators'
import { pluginTs } from '@kubb/plugin-ts'
import { type PluginZod, pluginZod } from '@kubb/plugin-zod'
import { zodGenerator } from '@kubb/plugin-zod/generators'

// Paths in the Elysia backend spec start with /api, $fetch baseURL already includes it
const API_PREFIX = '/api'

/**
 * Generates `src/generated/kubb/betterFetchSchema.ts` with a better-fetch `createSchema`
 * reusing the zod schemas produced by plugin-zod.
 */
const betterFetchSchemaGenerator = createGenerator<PluginZod>({
  name: 'better-fetch-schema',
  async operations({ operations, generator, plugin, config }) {
    const { pluginManager } = generator.context
    const pluginKey = plugin.key
    const filePath = path.resolve(config.root, config.output.path, 'betterFetchSchema.ts')

    const imports: Array<{ name: string[]; path: string; root: string }> = []
    const entries: string[] = []

    for (const operation of operations) {
      if (!operation.path.startsWith(`${API_PREFIX}/`)) continue

      const schemas = generator.getSchemas(operation, {
        resolveName: (name) => pluginManager.resolveName({ name, pluginKey, type: 'function' }),
      })
      const key = `@${operation.method}${operation.path
        .slice(API_PREFIX.length)
        .replace(/\{(\w+)\}/g, ':$1')}`

      const fields: Record<string, string | undefined> = {
        params: schemas.pathParams?.name,
        query: schemas.queryParams?.name,
        input: schemas.request?.name,
        output: schemas.response.name,
      }
      const used = Object.values(fields).filter((name): name is string => !!name)

      const zodFile = pluginManager.getFile({
        name: pluginManager.resolveName({
          name: operation.getOperationId(),
          pluginKey,
          type: 'file',
        }),
        extname: '.ts',
        pluginKey,
        options: { type: 'file', pluginKey },
      })
      imports.push({ name: used, path: zodFile.path, root: filePath })

      const body = Object.entries(fields)
        .filter(([, name]) => name)
        .map(([field, name]) => `    ${field}: ${name},`)
        .join('\n')
      entries.push(`  '${key}': {\n${body}\n  },`)
    }

    return [
      {
        baseName: 'betterFetchSchema.ts',
        path: filePath,
        imports: [{ name: ['createSchema'], path: '@better-fetch/fetch' }, ...imports],
        exports: [],
        sources: [
          {
            name: 'betterFetchSchema',
            isExportable: true,
            isIndexable: false,
            value: `export const betterFetchSchema = createSchema({\n${entries.join('\n')}\n}, { strict: true })`,
          },
        ],
      },
    ]
  },
})

export default defineConfig({
  input: {
    path: 'http://localhost:3333/openapi/json',
  },
  output: {
    path: './src/generated/kubb',
    clean: true,
  },
  plugins: [
    pluginOas(),
    pluginTs(),
    pluginZod({
      generators: [zodGenerator, betterFetchSchemaGenerator],
    }),
  ],
})
