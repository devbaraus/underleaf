# Deploy com Docker Compose

Requisitos: Docker Engine com Compose v2 ou superior. Execute os comandos na raiz do repositório.

## Desenvolvimento

O `docker-compose.yml` contém somente PostgreSQL, disponível em `127.0.0.1:5432`.
As variáveis `POSTGRES_*` vêm de `.env`, quando disponível, com os valores de desenvolvimento
mostrados em `.env.example`. Altere `POSTGRES_PORT` se precisar de outra porta.

```sh
docker compose up -d --wait
bun run dev:backend
# Em outro terminal:
bun run dev:frontend
```

## Produção

O `docker-compose.prod.yml` é independente e contém PostgreSQL, backend, frontend e Nginx.
Use esse arquivo diretamente com `-f`; ele não precisa ser combinado com o Compose de
desenvolvimento. O projeto `underleaf-prod` usa rede e volumes separados do desenvolvimento
(`underleaf`). A porta do banco não é publicada em produção.

## Primeiro deploy de produção

```sh
cp .env.docker.example .env.docker
openssl rand -hex 32 # coloque o resultado em POSTGRES_PASSWORD
openssl rand -hex 32 # coloque outro resultado em BETTER_AUTH_SECRET
# Edite .env.docker com esses valores e a URL pública.
docker compose -f docker-compose.prod.yml --env-file .env.docker up -d --build --wait
```

Acesse `http://localhost:8080` e crie uma conta. Não há usuário ou senha de administrador
criados automaticamente. `APP_URL` deve corresponder à URL usada no navegador, sem barra final.
A porta exposta é `PUBLIC_PORT`; PostgreSQL, frontend e backend ficam na rede interna.
A API usa `/api`, os WebSockets passam pelo proxy e `/healthz` verifica o banco.

O backend aplica `prisma migrate deploy` antes de iniciar. O Tectonic 0.17.0 é baixado de
uma release oficial e verificado por SHA-256 durante o build, com suporte a amd64 e arm64.
A primeira compilação de um documento precisa de internet para baixar o bundle TeX;
os downloads ficam em cache no volume de armazenamento. O Compose permite até 5 minutos
por compilação; ajuste `TECTONIC_TIMEOUT_MS` se necessário (máximo de 10 minutos).

## Domínio e HTTPS

Configure `APP_URL=https://latex.seudominio.com` e coloque um proxy com TLS (Caddy,
Traefik ou o proxy do seu provedor) na frente da porta `PUBLIC_PORT`. O proxy externo
precisa repassar `Host`, `X-Forwarded-Proto` e upgrades WebSocket. O Nginx deste Compose
serve HTTP; os certificados ficam a cargo do proxy externo. Não é necessário reconstruir
as imagens quando mudar o domínio: execute novamente `up -d` com o arquivo de ambiente.

O frontend usa a API na mesma origem no navegador. No SSR, `INTERNAL_API_URL` aponta para
`http://backend:3333`, encaminhando a sessão ao backend pela rede interna.

Para Mendeley, configure as três variáveis `MENDELEY_*` em `.env.docker`; registre
`https://latex.seudominio.com/api/references/mendeley/callback` como redirect no provedor.
As credenciais opcionais vazias deixam a integração desabilitada.

## Operação e atualização

```sh
docker compose -f docker-compose.prod.yml --env-file .env.docker ps
docker compose -f docker-compose.prod.yml --env-file .env.docker logs -f backend frontend proxy
docker compose -f docker-compose.prod.yml --env-file .env.docker up -d --build --wait
docker compose -f docker-compose.prod.yml --env-file .env.docker down
```

Ao alterar `deploy/nginx.conf`, valide e recarregue o proxy:

```sh
docker compose -f docker-compose.prod.yml --env-file .env.docker exec proxy nginx -t
docker compose -f docker-compose.prod.yml --env-file .env.docker exec proxy nginx -s reload
```

`down` mantém os volumes `postgres_data` e `project_storage`. O segundo contém projetos,
PDFs e cache do Tectonic. Faça backup dos dois antes de atualizar; `down -v` apaga os dados.
Não execute mais de uma réplica do backend: as salas Yjs são mantidas em memória neste servidor.
Novas alterações no schema devem acompanhar uma migração Prisma versionada.

Backup (sem parar a aplicação):

```sh
docker compose -f docker-compose.prod.yml --env-file .env.docker exec -T postgres sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB"' > underleaf.sql
docker compose -f docker-compose.prod.yml --env-file .env.docker exec -T backend tar -czf - -C storage . > underleaf-storage.tar.gz
```

Para um backup consistente entre banco e arquivos, interrompa edições/compilações durante
a captura. Guarde os arquivos e `.env.docker` em local protegido.

## Banco já existente

A migração inicial destina-se a um banco vazio. Se o banco foi criado anteriormente com
`prisma db push`, faça backup, confirme que ele corresponde integralmente ao schema atual
e marque a migração como aplicada antes de iniciar o backend:

```sh
docker compose -f docker-compose.prod.yml --env-file .env.docker build backend
docker compose -f docker-compose.prod.yml --env-file .env.docker up -d postgres
docker compose -f docker-compose.prod.yml --env-file .env.docker run --rm --no-deps --entrypoint node backend \
  node_modules/prisma/build/index.js migrate resolve --applied 20261002140000_initial
```

Isso não altera o schema nem move dados de outra instalação. Para migrar uma instalação
anterior, restaure seu dump no PostgreSQL e copie a pasta `storage` para o volume novo.
Se o schema divergir, prepare uma migração de ajuste antes de registrar o baseline.
