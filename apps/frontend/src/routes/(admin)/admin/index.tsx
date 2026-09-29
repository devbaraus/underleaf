import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Activity, Users, BookOpen, Cpu, ShieldCheck } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '#/components/ui/table'
import { Badge } from '#/components/ui/badge'
import { appConfig } from '#/config'

export const Route = createFileRoute('/(admin)/admin/')({
  component: AdminOverviewPage,
})

function AdminOverviewPage() {
  const { data: telemetry, isLoading: loadingTelemetry } = useQuery({
    queryKey: ['admin-telemetry'],
    queryFn: async () => {
      const res = await fetch(`${appConfig.apiUrl}/api/admin/telemetry`, {
        credentials: 'include',
      })
      if (!res.ok) throw new Error('Falha ao obter telemetria')
      return res.json()
    },
    refetchInterval: 10000,
  })

  const { data: auditLogs = [], isLoading: loadingAudit } = useQuery({
    queryKey: ['admin-audit'],
    queryFn: async () => {
      const res = await fetch(`${appConfig.apiUrl}/api/admin/audit`, {
        credentials: 'include',
      })
      if (!res.ok) throw new Error('Falha ao obter logs de auditoria')
      return res.json()
    },
    refetchInterval: 10000,
  })

  return (
    <div className="max-w-6xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Visão Geral & Telemetria</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Monitoramento em tempo real do ecossistema Underleaf e auditoria de ações.
        </p>
      </div>

      {/* Cards de Métricas */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-zinc-400">Usuários Ativos</CardTitle>
            <Users className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-100">
              {loadingTelemetry ? '...' : telemetry?.stats?.userCount || 0}
            </div>
            <p className="text-[11px] text-zinc-500 mt-1">Cadastrados na plataforma</p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-zinc-400">Total de Projetos</CardTitle>
            <BookOpen className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-100">
              {loadingTelemetry ? '...' : telemetry?.stats?.projectCount || 0}
            </div>
            <p className="text-[11px] text-zinc-500 mt-1">Repositórios LaTeX</p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-zinc-400">Compilações Realizadas</CardTitle>
            <Activity className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-100">
              {loadingTelemetry ? '...' : telemetry?.stats?.compilationCount || 0}
            </div>
            <p className="text-[11px] text-zinc-500 mt-1">
              {telemetry?.stats?.successfulCompilations || 0} com sucesso
            </p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-zinc-400">Memória RSS (Bun)</CardTitle>
            <Cpu className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-100">
              {loadingTelemetry ? '...' : `${telemetry?.memory?.rssMb || 0} MB`}
            </div>
            <p className="text-[11px] text-zinc-500 mt-1">Uptime: {Math.round((telemetry?.uptimeSeconds || 0) / 60)} min</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Auditoria (AuditLog) */}
      <Card className="border-zinc-800 bg-zinc-900/40">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <CardTitle className="text-sm font-semibold text-zinc-200">
              Registro de Auditoria Recente (`audit_log`)
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="border-zinc-800">
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-400 text-xs">Modelo</TableHead>
                <TableHead className="text-zinc-400 text-xs">Ação</TableHead>
                <TableHead className="text-zinc-400 text-xs">Usuário</TableHead>
                <TableHead className="text-zinc-400 text-xs">ID do Registro</TableHead>
                <TableHead className="text-zinc-400 text-xs">Horário</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loadingAudit ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-xs text-zinc-500 py-4">
                    Carregando logs de auditoria...
                  </TableCell>
                </TableRow>
              ) : auditLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-xs text-zinc-500 py-4">
                    Nenhum log gravado ainda.
                  </TableCell>
                </TableRow>
              ) : (
                auditLogs.slice(0, 15).map((log: any) => (
                  <TableRow key={log.id} className="border-zinc-800/60 hover:bg-zinc-800/30">
                    <TableCell className="font-mono text-xs text-zinc-300">{log.model}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          log.action === 'CREATE'
                            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px]'
                            : log.action === 'UPDATE'
                              ? 'border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px]'
                              : 'border-red-500/30 bg-red-500/10 text-red-400 text-[10px]'
                        }
                      >
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-zinc-400">
                      {log.user ? `${log.user.name} (${log.user.email})` : 'Sistema'}
                    </TableCell>
                    <TableCell className="font-mono text-[11px] text-zinc-500">
                      {log.recordId || '-'}
                    </TableCell>
                    <TableCell className="text-xs text-zinc-500">
                      {new Date(log.createdAt).toLocaleTimeString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
