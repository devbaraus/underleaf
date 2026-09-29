import { describe, expect, it } from 'bun:test'
import { app } from './index'

describe('Underleaf Backend API', () => {
  it('GET /healthz retorna 200 e banco saudável', async () => {
    const res = await app.handle(new Request('http://localhost:3333/healthz'))
    expect(res.status).toBe(200)

    const data = (await res.json()) as any
    expect(data.ok).toBe(true)
    expect(data.database).toBe(true)
  })

  it('GET /openapi/json retorna documentação OpenAPI 3.0', async () => {
    const res = await app.handle(new Request('http://localhost:3333/openapi/json'))
    expect(res.status).toBe(200)

    const docs = (await res.json()) as any
    expect(docs.openapi).toBeDefined()
    expect(docs.info.title).toBe('Underleaf API')
  })
})
