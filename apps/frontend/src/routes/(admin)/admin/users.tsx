import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Shield, HardDrive, Ban, CheckCircle, UserCheck } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '#/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '#/components/ui/card'
import { Button } from '#/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '#/components/ui/dialog'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { Badge } from '#/components/ui/badge'
import { appConfig } from '#/config'

export const Route = createFileRoute('/(admin)/admin/users')({
  component: AdminUsersPage,
})

function AdminUsersPage() {
  const queryClient = useQueryClient()
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [newQuota, setNewQuota] = useState<number>(500)
  const [isQuotaOpen, setIsQuotaOpen] = useState(false)

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const res = await fetch(`${appConfig.apiUrl}/api/admin/users`, {
        credentials: 'include',
      })
      if (!res.ok) throw new Error('Falha ao listar usuários')
      return res.json()
    },
  })

  // Mutação para alterar cota
  const quotaMutation = useMutation({
    mutationFn: async ({ userId, quotaMb }: { userId: string; quotaMb: number }) => {
      const res = await fetch(`${appConfig.apiUrl}/api/admin/users/${userId}/quota`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ quotaMb }),
      })
      if (!res.ok) throw new Error('Falha ao atualizar cota')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
      setIsQuotaOpen(false)
      toast.success('Cota atualizada com sucesso!')
    },
    onError: (err: any) => {
      toast.error(err.message || 'Erro ao atualizar cota')
    },
  })

  // Mutação para alterar status
  const statusMutation = useMutation({
    mutationFn: async ({ userId, status }: { userId: string; status: string }) => {
      const res = await fetch(`${appConfig.apiUrl}/api/admin/users/${userId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error('Falha ao atualizar status')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
      toast.success('Status do usuário alterado!')
    },
  })

  // Mutação para alterar role
  const roleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
      const res = await fetch(`${appConfig.apiUrl}/api/admin/users/${userId}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ role }),
      })
      if (!res.ok) throw new Error('Falha ao alterar papel')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
      toast.success('Papel do usuário atualizado!')
    },
  })

  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Gestão de Usuários e Cotas</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Controle permissões administrativas, limites de armazenamento e suspensão de contas.
        </p>
      </div>

      <Card className="border-zinc-800 bg-zinc-900/40">
        <CardHeader>
          <CardTitle className="text-base text-zinc-200">Usuários Cadastrados</CardTitle>
          <CardDescription className="text-xs text-zinc-400">
            Total de {users.length} usuários na base de dados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="border-zinc-800">
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-400 text-xs">Usuário</TableHead>
                <TableHead className="text-zinc-400 text-xs">Papel (Role)</TableHead>
                <TableHead className="text-zinc-400 text-xs">Status</TableHead>
                <TableHead className="text-zinc-400 text-xs">Cota de Disco</TableHead>
                <TableHead className="text-zinc-400 text-xs">Projetos</TableHead>
                <TableHead className="text-right text-zinc-400 text-xs">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-xs text-zinc-500 py-6">
                    Carregando usuários...
                  </TableCell>
                </TableRow>
              ) : (
                users.map((u: any) => (
                  <TableRow key={u.id} className="border-zinc-800/60 hover:bg-zinc-800/30">
                    <TableCell>
                      <div className="font-semibold text-xs text-zinc-200">{u.name}</div>
                      <div className="text-[11px] text-zinc-500">{u.email}</div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          u.role === 'admin'
                            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px]'
                            : 'border-zinc-700 bg-zinc-800 text-zinc-300 text-[10px]'
                        }
                      >
                        {u.role.toUpperCase()}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          u.status === 'active'
                            ? 'border-emerald-500/30 text-emerald-400 text-[10px]'
                            : 'border-red-500/30 text-red-400 text-[10px]'
                        }
                      >
                        {u.status === 'active' ? 'Ativo' : 'Suspenso'}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-xs text-zinc-300">
                      <div className="flex items-center space-x-1.5">
                        <HardDrive className="h-3.5 w-3.5 text-zinc-400" />
                        <span>{u.quotaMb} MB</span>
                      </div>
                    </TableCell>

                    <TableCell className="text-xs text-zinc-400">
                      {u._count?.projects || 0}
                    </TableCell>

                    <TableCell className="text-right space-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedUser(u)
                          setNewQuota(u.quotaMb)
                          setIsQuotaOpen(true)
                        }}
                        className="h-7 text-xs border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                      >
                        Alterar Cota
                      </Button>

                      {u.role !== 'admin' ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => roleMutation.mutate({ userId: u.id, role: 'admin' })}
                          className="h-7 text-xs text-zinc-400 hover:text-emerald-400"
                          title="Promover para Administrador"
                        >
                          <Shield className="h-3.5 w-3.5 mr-1" />
                          Tornar Admin
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => roleMutation.mutate({ userId: u.id, role: 'editor' })}
                          className="h-7 text-xs text-zinc-400 hover:text-zinc-200"
                          title="Rebaixar para Editor"
                        >
                          <UserCheck className="h-3.5 w-3.5 mr-1" />
                          Editor
                        </Button>
                      )}

                      {u.status === 'active' ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => statusMutation.mutate({ userId: u.id, status: 'suspended' })}
                          className="h-7 text-xs text-red-400 hover:bg-red-500/10"
                        >
                          <Ban className="h-3.5 w-3.5" />
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => statusMutation.mutate({ userId: u.id, status: 'active' })}
                          className="h-7 text-xs text-emerald-400 hover:bg-emerald-500/10"
                        >
                          <CheckCircle className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal de Alteração de Cota */}
      <Dialog open={isQuotaOpen} onOpenChange={setIsQuotaOpen}>
        <DialogContent className="border-zinc-800 bg-zinc-900 text-zinc-100">
          <DialogHeader>
            <DialogTitle>Alterar Cota de Armazenamento</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Usuário: <span className="font-semibold text-zinc-200">{selectedUser?.name}</span> ({selectedUser?.email})
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-3">
            <div className="space-y-2">
              <Label htmlFor="quota" className="text-zinc-300">Nova Cota em Megabytes (MB)</Label>
              <Input
                id="quota"
                type="number"
                min={50}
                max={50000}
                value={newQuota}
                onChange={(e) => setNewQuota(parseInt(e.target.value, 10) || 50)}
                className="border-zinc-700 bg-zinc-800 text-zinc-100"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsQuotaOpen(false)}
              className="border-zinc-700 bg-zinc-800 text-zinc-300"
            >
              Cancelar
            </Button>
            <Button
              disabled={quotaMutation.isPending}
              onClick={() => quotaMutation.mutate({ userId: selectedUser.id, quotaMb: newQuota })}
              className="bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              {quotaMutation.isPending ? 'Salvando...' : 'Salvar Cota'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
