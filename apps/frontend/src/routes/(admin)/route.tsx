import { createFileRoute, Outlet, redirect, Link } from '@tanstack/react-router'
import { checkAuthFn } from '#/services/auth'
import { Users, Activity, FileText, ArrowLeft } from 'lucide-react'
import { Button } from '#/components/ui/button'

export const Route = createFileRoute('/(admin)')({
  beforeLoad: async () => {
    const { isAuthenticated, user } = await checkAuthFn()
    if (!isAuthenticated || !user) {
      throw redirect({ to: '/login' })
    }
    if (user.role !== 'admin') {
      throw redirect({ to: '/projects' })
    }
    return { user }
  },
  component: AdminLayout,
})

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      {/* Sidebar Administrativa */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-900/60 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-2 pb-6 border-b border-zinc-800">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 font-bold text-zinc-950">
              🛡️
            </span>
            <div>
              <div className="font-bold text-sm">Underleaf Admin</div>
              <div className="text-[10px] text-zinc-400">Painel de Governança</div>
            </div>
          </div>

          <nav className="mt-6 space-y-1">
            <Link
              to="/admin"
              activeProps={{ className: 'bg-zinc-800 text-emerald-400 font-semibold' }}
              className="flex items-center space-x-2 rounded-lg px-3 py-2 text-xs text-zinc-300 hover:bg-zinc-800/60"
            >
              <Activity className="h-4 w-4" />
              <span>Visão Geral & Telemetria</span>
            </Link>

            <Link
              to="/admin/users"
              activeProps={{ className: 'bg-zinc-800 text-emerald-400 font-semibold' }}
              className="flex items-center space-x-2 rounded-lg px-3 py-2 text-xs text-zinc-300 hover:bg-zinc-800/60"
            >
              <Users className="h-4 w-4" />
              <span>Gestão de Usuários & Cotas</span>
            </Link>
          </nav>
        </div>

        <div>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="w-full justify-start text-xs text-zinc-400 hover:text-zinc-200"
          >
            <Link to="/projects">
              <ArrowLeft className="mr-2 h-3.5 w-3.5" />
              Voltar aos Projetos
            </Link>
          </Button>
        </div>
      </aside>

      {/* Área de Conteúdo Admin */}
      <div className="flex-1 overflow-auto p-8">
        <Outlet />
      </div>
    </div>
  )
}
