import { createServerFn } from '@tanstack/react-start'
import { getRequestHeader } from '@tanstack/react-start/server'

import { appConfig } from '#/config'
import type { User } from '#/generated/kubb/types/User'

// Runs on the server (SSR reload and client navigation via RPC), so the browser session
// cookie must be forwarded manually, plain fetch on the server carries none.
export const checkAuthFn = createServerFn({ method: 'GET' }).handler(
  async (): Promise<{ isAuthenticated: boolean; user: User | null }> => {
    const unauthenticated = { isAuthenticated: false, user: null }
    try {
      const res = await fetch(`${appConfig.apiUrl}/api/auth/get-session`, {
        headers: { cookie: getRequestHeader('cookie') ?? '' },
      })
      if (!res.ok) return unauthenticated

      const data = await res.json()
      return data?.user ? { isAuthenticated: true, user: data.user } : unauthenticated
    } catch {
      return unauthenticated
    }
  },
)
