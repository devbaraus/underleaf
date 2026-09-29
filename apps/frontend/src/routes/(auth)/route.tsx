import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)')({
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4 text-zinc-100">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 font-bold text-2xl text-zinc-950 shadow-lg shadow-emerald-500/20">
            🍃
          </div>
          <h1 className="mt-3 font-bold text-2xl tracking-tight">Underleaf</h1>
          <p className="mt-1 text-sm text-zinc-400">Plataforma Open-Source para Edição LaTeX</p>
        </div>
        <Outlet />
      </div>
    </div>
  )
}
