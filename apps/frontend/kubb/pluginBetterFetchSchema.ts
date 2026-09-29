import { ast, defineGenerator, definePlugin } from 'kubb/kit'
import type { Output, PluginFactoryOptions } from 'kubb/kit'

export type PluginBetterFetchSchemaOptions = {
  /**
   * Prefix stripped from every operation path. Operations outside the prefix are skipped,
   * because $fetch `baseURL` already includes it.
   * @default '/api'
   */
  prefix?: string
  /**
   * Generated file name, relative to the plugin output.
   * @default 'betterFetchSchema.ts'
   */
  filename?: `${string}.${string}`
}

export type PluginBetterFetchSchema = PluginFactoryOptions<
  'plugin-better-fetch-schema',
  PluginBetterFetchSchemaOptions,
  Required<PluginBetterFetchSchemaOptions>
>

const isObj = (fields: string[]) => `z.object({ ${fields.join(', ')} })`

const betterFetchSchemaGenerator = defineGenerator<PluginBetterFetchSchema>({
  name: 'better-fetch-schema',
  operations(nodes, ctx) {
    const { prefix, filename } = ctx.options
    const zod = ctx.requirePlugin('plugin-zod').options!
    const zodResolver = ctx.getResolver('plugin-zod')
    const filePath = `${ctx.root}/${filename}`

    const imports: ast.ImportNode[] = [
      ast.factory.createImport({ name: ['createSchema'], path: '@better-fetch/fetch' }),
    ]
    const entries: string[] = []

    for (const node of nodes) {
      if (!ast.isHttpOperationNode(node) || !node.path.startsWith(`${prefix}/`)) continue

      const zodFile = zodResolver.file({
        name: node.operationId,
        extname: '.ts',
        tag: node.tags[0] ?? 'default',
        path: node.path,
        root: ctx.root,
        output: zod.output as Output,
        group: zod.group ?? undefined,
      })

      const fields = (location: 'path' | 'query') =>
        node.parameters
          .filter((param) => param.in === location)
          .map((param) => {
            const name = zodResolver.param.name(node, param)
            imports.push(ast.factory.createImport({ name: [name], path: zodFile.path, root: filePath }))
            return `${JSON.stringify(param.name)}: ${name}${param.required ? '' : '.optional()'}`
          })

      const pathFields = fields('path')
      const queryFields = fields('query')
      const props: string[] = []
      if (pathFields.length) props.push(`params: ${isObj(pathFields)}`)
      if (queryFields.length) props.push(`query: ${isObj(queryFields)}`)

      // multi content-type bodies get variant names from plugin-zod, skip those
      const body = node.requestBody?.content
      if (body?.length === 1 && body[0].schema) {
        const name = zodResolver.response.body(node)
        imports.push(ast.factory.createImport({ name: [name], path: zodFile.path, root: filePath }))
        props.push(`input: ${name}`)
      }

      if (node.responses.some((res) => res.content?.some((entry) => entry.schema))) {
        const name = zodResolver.response.response(node)
        imports.push(ast.factory.createImport({ name: [name], path: zodFile.path, root: filePath }))
        props.push(`output: ${name}`)
      }

      const key = `@${node.method.toLowerCase()}${node.path.slice(prefix.length).replace(/\{(\w+)\}/g, ':$1')}`
      entries.push(`  ${JSON.stringify(key)}: {\n    ${props.join(',\n    ')}${props.length ? ',' : ''}\n  },`)
    }

    if (!entries.length) return null

    const hasZ = imports.length > 1
    if (hasZ) imports.push(ast.factory.createImport({ name: 'z', path: zod.importPath ?? 'zod', isNameSpace: true }))

    return [
      ast.factory.createFile({
        baseName: filename,
        path: filePath,
        imports,
        sources: [
          ast.factory.createSource({
            name: 'betterFetchSchema',
            isExportable: true,
            isIndexable: false,
            nodes: [
              ast.factory.createText(
                `export const betterFetchSchema = createSchema({\n${entries.join('\n')}\n}, { strict: true })`,
              ),
            ],
          }),
        ],
      }),
    ]
  },
})

export const pluginBetterFetchSchema = definePlugin<PluginBetterFetchSchema>((options = {}) => {
  const resolved: Required<PluginBetterFetchSchemaOptions> = { prefix: '/api', filename: 'betterFetchSchema.ts', ...options }
  return {
    name: 'plugin-better-fetch-schema',
    options,
    hooks: {
      'kubb:plugin:setup'(ctx) {
        ctx.setOptions(resolved)
        ctx.addGenerator(betterFetchSchemaGenerator)
      },
    },
  }
})
