import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { Button } from '#/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '#/components/ui/card'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { appConfig } from '#/config'

export const Route = createFileRoute('/(auth)/login')({
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`${appConfig.apiUrl}/api/auth/sign-in/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Falha ao autenticar')
      }

      toast.success('Login efetuado com sucesso!')
      navigate({ to: '/projects' })
    } catch (err: any) {
      toast.error(err.message || 'Credenciais inválidas')
    } finally {
      setLoading(false)
    }
  }

  const fillDemoAdmin = () => {
    setEmail('admin@underleaf.io')
    setPassword('admin123')
  }

  return (
    <Card className="border-zinc-800 bg-zinc-900/60 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-xl text-zinc-100">Entrar na sua conta</CardTitle>
        <CardDescription className="text-zinc-400">
          Informe seu e-mail e senha para acessar seus projetos LaTeX.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-zinc-300">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-zinc-700 bg-zinc-800/80 text-zinc-100"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-zinc-300">Senha</Label>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-zinc-700 bg-zinc-800/80 text-zinc-100"
            />
          </div>

          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-400">
            <span className="font-semibold">Demo credentials:</span> admin@underleaf.io / admin123
            <button
              type="button"
              onClick={fillDemoAdmin}
              className="ml-2 font-medium underline hover:text-emerald-300"
            >
              Preencher
            </button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
