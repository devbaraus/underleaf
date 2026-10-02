import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto'

export function seal(value: object, secret: string) {
  const iv = randomBytes(12)
  const key = createHash('sha256').update(`underleaf-references:${secret}`).digest()
  const cipher = createCipheriv('aes-256-gcm', key, iv)
  const data = Buffer.concat([cipher.update(JSON.stringify(value), 'utf8'), cipher.final()])
  return Buffer.concat([iv, cipher.getAuthTag(), data]).toString('base64url')
}

export function unseal<T extends { userId: string; expires: number }>(
  value: string | undefined,
  userId: string,
  secret: string,
): T | null {
  try {
    if (!value) return null
    const buffer = Buffer.from(value, 'base64url')
    const key = createHash('sha256').update(`underleaf-references:${secret}`).digest()
    const decipher = createDecipheriv('aes-256-gcm', key, buffer.subarray(0, 12))
    decipher.setAuthTag(buffer.subarray(12, 28))
    const data = JSON.parse(
      Buffer.concat([decipher.update(buffer.subarray(28)), decipher.final()]).toString('utf8'),
    ) as T
    return data.userId === userId && data.expires > Date.now() ? data : null
  } catch {
    return null
  }
}
