
### Referências via Zotero e Mendeley

No workspace, abra **Referências** para importar a biblioteca como um novo arquivo `.bib`.
As chaves ficam disponíveis automaticamente nas sugestões de `\cite{...}`. Para aparecerem
no PDF, inclua o arquivo importado na configuração bibliográfica do documento (por exemplo,
`\bibliography{zotero-...}` ou `\addbibresource{zotero-....bib}`, conforme o pacote utilizado).
Cada importação é um snapshot novo; não há sincronização automática periódica com os provedores.

- **Zotero:** informe o ID numérico da biblioteca pessoal ou de grupo e uma chave dedicada
  com permissão de leitura, criada em https://www.zotero.org/settings/keys. A chave é enviada
  apenas ao backend para a importação e não é persistida.
- **Mendeley:** registre um aplicativo em https://dev.mendeley.com e configure
  `MENDELEY_CLIENT_ID`, `MENDELEY_CLIENT_SECRET` e `MENDELEY_REDIRECT_URI` no backend.
  O redirect registrado deve corresponder exatamente a
  `http://localhost:3333/api/references/mendeley/callback` no desenvolvimento.
  Configure também `FRONTEND_URL` com a origem do frontend e inclua essa origem em `CORS_ORIGIN`.
  Reinicie o backend após alterar essas variáveis. A interface mostra **Conectar Mendeley**
  quando as credenciais estão configuradas. O usuário autoriza no provedor e volta ao projeto
  para importar. O OAuth exige o escopo `all` do Mendeley; esta integração faz somente leitura
  da biblioteca. O client secret permanece no servidor. Tokens são criptografados com
  `BETTER_AUTH_SECRET` em cookie HttpOnly vinculado ao usuário, válido por 30 dias, com
  renovação automática do access token. **Desconectar** apaga a conexão deste navegador;
  para revogar a autorização no provedor, use as configurações da conta Mendeley.

A importação exige permissão de edição do projeto, percorre a paginação e limita cada
biblioteca a 5 MB e 100 páginas. Falhas no provedor não criam arquivos parciais. Em produção,
use HTTPS e um `BETTER_AUTH_SECRET` forte e estável. O frontend e a API precisam estar no
mesmo site para o cookie `SameSite=Lax` (por exemplo, `app.exemplo.com` e `api.exemplo.com`).
Não coloque o client secret em variáveis `VITE_*`.

Documentação dos provedores: [Zotero Web API v3](https://www.zotero.org/support/dev/web_api/v3/basics),
[Mendeley OAuth](https://dev.mendeley.com/reference/topics/authorization_auth_code.html) e
[Mendeley BibTeX API](https://dev.mendeley.com/methods/).

### Deploy com Docker

O `docker-compose.yml` sobe somente PostgreSQL para desenvolvimento. O
`docker-compose.prod.yml` sobe PostgreSQL, backend com Tectonic, frontend e Nginx
para produção, preservando banco, projetos e PDFs em volumes. Consulte [o guia de deploy](deploy/README.md) para configurar
`.env.docker`, iniciar a aplicação, usar HTTPS e realizar backups.
