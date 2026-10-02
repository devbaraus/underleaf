# Colaboração

O editor usa `y-monaco` e `y-websocket`. O endpoint autenticado é
`/api/collaboration/:projectId/:fileId`; o nome da sala no provider é o ID do
arquivo. Cada arquivo de texto tem um `Y.Text('content')` e um snapshot binário
em `ProjectFile.yjsState`. A presença/cursor é efêmera e desaparece ao desconectar.

## Banco

Este repositório usa `db:push` e não possui histórico de migrations. Antes de
iniciar esta versão, sincronize o schema com o banco de desenvolvimento:

```sh
bun run --cwd apps/backend db:push
bun run --cwd apps/backend db:generate
```

Isso cria a tabela `project_colaborator` definida no schema e a coluna opcional
`project_file.yjs_state`. Arquivos existentes são convertidos na primeira conexão;
o servidor inicializa o documento e persiste sua identidade CRDT uma única vez.
O texto continua materializado em `storage/projects` para o Tectonic. O estado
binário deve fazer parte dos backups junto com os arquivos e o banco.

## Acesso e protocolo

O proprietário compartilha com usuários cadastrados por e-mail. Editores podem
editar arquivos e compilar; leitores podem sincronizar texto e presença. Apenas
o proprietário altera as permissões e exclui o projeto. `collaborator`, o papel
já previsto no schema, é tratado como editor. Alterações de permissão desconectam
as sessões do usuário no projeto. Cada mensagem verifica novamente sessão,
status do usuário e participação no projeto. A origem do WebSocket usa a mesma
lista `CORS_ORIGIN` da API.

O protocolo binário segue y-websocket: sync (0), awareness (1), query awareness
(3). A extensão (4 + nonce) confirma uma barreira ordenada depois que todas as
mensagens anteriores foram persistidas. O editor aguarda essa confirmação antes
de solicitar compilação. PUT de texto inteiro e `unsavedFiles` são rejeitados
com 409 para arquivos que já têm estado Yjs, evitando sobrescrever o CRDT.

## Operação

As salas ficam em memória e são descartadas 30 segundos após ficarem vazias;
as atualizações são persistidas antes de serem retransmitidas. O cliente
reconecta automaticamente, mantém suas alterações pendentes enquanto montado e
bloqueia novas edições durante a desconexão. Não há armazenamento offline local:
a aba precisa permanecer aberta para reenviar alterações ainda pendentes.

Execute **uma instância do backend**. Múltiplas instâncias exigem roteamento por
arquivo e/ou coordenação compartilhada; um balanceador sem afinidade pode criar
salas divergentes. O proxy deve permitir upgrades WebSocket nessa rota.

A árvore de arquivos é atualizada via API/refetch; este recurso sincroniza o
conteúdo e os cursores dos arquivos, não eventos de criação/exclusão da árvore.

## Verificação

```sh
bun test apps/backend/src/modules/collaboration/collaboration-room.test.ts
```

Para verificar manualmente: compartilhe como editor, abra o mesmo arquivo em
duas sessões autenticadas e faça edições simultâneas. Recarregue ambas, compile,
teste reconexão e altere a permissão para leitor. O leitor deve acompanhar o
texto sem conseguir alterá-lo. Remova o acesso e confirme a desconexão.
