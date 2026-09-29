import { appConfig } from '#/config'

export interface UserSession {
  id: string
  name: string
  email: string
  role: string
  status: string
  quotaMb: number
}

export async function checkAuthFn(): Promise<{ isAuthenticated: boolean; user: UserSession | null }> {
  try {
    const res = await fetch(`${appConfig.apiUrl}/api/auth/get-session`, {
      credentials: 'include',
    })

    if (!res.ok) {
      return { isAuthenticated: false, user: null }
    }

    const data = await res.json()
    if (!data?.user) {
      return { isAuthenticated: false, user: null }
    }

    return {
      isAuthenticated: true,
      user: data.user,
    }
  } catch {
    return { isAuthenticated: false, user: null }
  }
}
