import { useState } from 'react'
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { toast } from 'sonner'
import { Button } from '#/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '#/components/ui/card'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { appConfig } from '#/config'

export const Route = createFileRoute('/(auth)/register')({
  component: RegisterPage,
})

function RegisterPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`${appConfig.apiUrl}/api/auth/sign-up/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Falha ao criar conta')
      }

      toast.success('Conta criada com sucesso!')
      navigate({ to: '/projects' })
    } catch (err: any) {
      toast.error(err.message || 'Erro ao registrar usuário')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-zinc-800 bg-zinc-900/60 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-xl text-zinc-100">Criar uma conta</CardTitle>
        <CardDescription className="text-zinc-400">
          Comece a criar e compilar seus projetos LaTeX instantaneamente.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-zinc-300">Nome completo</Label>
            <Input
              id="name"
              type="text"
              placeholder="Seu Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border-zinc-700 bg-zinc-800/80 text-zinc-100"
            />
          </div>
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
            <Label htmlFor="password" className="text-zinc-300">Senha</Label>
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
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white"
            disabled={loading}
          >
            {loading ? 'Criando conta...' : 'Cadastrar'}
          </Button>
          <div className="text-center text-xs text-zinc-400">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-emerald-400 hover:underline">
              Fazer login
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
