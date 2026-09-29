import { defineConfig } from 'kubb/config'
import { adapterOas } from '@kubb/adapter-oas'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginZod } from '@kubb/plugin-zod'
import { pluginBetterFetchSchema } from './kubb/pluginBetterFetchSchema'

export default defineConfig({
  input:'http://localhost:3333/openapi/json',
  output: {
    path: './src/generated/kubb',
    clean: true,
  },
  adapter: adapterOas(),
  plugins: [
    pluginTs(),
    pluginZod(),
    pluginBetterFetchSchema(),
  ]
})
