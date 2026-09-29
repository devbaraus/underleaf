import { createFileRoute, Outlet, redirect, Link, useNavigate } from '@tanstack/react-router'
import { checkAuthFn } from '#/services/auth'
import { appConfig } from '#/config'
import { Button } from '#/components/ui/button'

export const Route = createFileRoute('/(app)')({
  beforeLoad: async () => {
    const { isAuthenticated, user } = await checkAuthFn()
    if (!isAuthenticated || !user) {
      throw redirect({
        to: '/login',
      })
    }
    return { user }
  },
  component: AppLayout,
})

function AppLayout() {
  const { user } = Route.useRouteContext()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await fetch(`${appConfig.apiUrl}/api/auth/sign-out`, {
        method: 'POST',
        credentials: 'include',
      })
      navigate({ to: '/login' })
    } catch {
      navigate({ to: '/login' })
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
      {/* Header Superior */}
      <header className="flex h-14 items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-4 backdrop-blur">
        <div className="flex items-center space-x-6">
          <Link to="/projects" className="flex items-center space-x-2 font-bold text-lg text-zinc-100 hover:text-emerald-400">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-sm font-black text-zinc-950">
              🍃
            </span>
            <span>Underleaf</span>
          </Link>
          <nav className="flex items-center space-x-1">
            <Link
              to="/projects"
              activeProps={{ className: 'bg-zinc-800 text-emerald-400' }}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-zinc-300 hover:bg-zinc-800/60"
            >
              Projetos
            </Link>
            {user.role === 'admin' && (
              <Link
                to="/admin"
                activeProps={{ className: 'bg-zinc-800 text-emerald-400' }}
                className="rounded-md px-3 py-1.5 text-sm font-medium text-zinc-300 hover:bg-zinc-800/60"
              >
                Administração
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right text-xs">
            <div className="font-semibold text-zinc-200">{user.name}</div>
            <div className="text-zinc-500">{user.email} ({user.role})</div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="border-zinc-700 bg-zinc-800 text-xs text-zinc-300 hover:bg-zinc-700 hover:text-white"
          >
            Sair
          </Button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
