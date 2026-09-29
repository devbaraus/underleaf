# Plano de Desenvolvimento — Underleaf

Plataforma Open-Source colaborativa para edição e compilação LaTeX com gestão administrativa avançada de usuários, cotas e projetos.

---

## 1. Visão Geral e Objetivos

O **Underleaf** foi idealizado para ser uma alternativa 100% open-source, moderna e de alto desempenho ao Overleaf. Diferente das soluções existentes, o Underleaf foca em:
1. **Governança e Administração de Primeira Classe**: Painel administrativo detalhado para controle de cotas de armazenamento, papéis de usuários (`admin`, `editor`, `viewer`), ativação/suspensão de contas, auditoria de projetos e métricas de sistema em tempo real.
2. **Alta Performance**: Servidor ultra-rápido construído com **Bun** e **ElysiaJS**.
3. **Renderização com JSX**: Templates tipados com JSX no backend (`@elysiajs/html`) gerando interfaces dinâmicas, com componentes interativos no frontend (Monaco Editor / CodeMirror, PDF.js, layout split-pane redimensionável).
4. **Persistência Confiável com Prisma 7**: Modelagem de dados relacional com Prisma ORM 7 conectado ao PostgreSQL (`underleaf-postgres` via Docker) com driver nativo.
5. **Autenticação com Better Auth**: Gerenciamento completo de sessões, senhas, tokens de verificação e controle de acesso baseado em papéis (RBAC).
6. **Motor LaTeX com Tectonic**: Compilação de LaTeX local e sob demanda usando o binário estático e moderno do Tectonic (`./bin/tectonic`), com download dinâmico de pacotes TeXLive, resolução de referências cruzadas e fallback em container.

---

## 2. Decisões Arquiteturais e Revisão do Usuário

> [!IMPORTANT]
> **Banco de Dados (PostgreSQL no Docker)**:
> O container `underleaf-postgres` (PostgreSQL 17) já foi provisionado na porta `5432` com usuário/senha `underleaf:underleaf` e banco `underleaf`. O Prisma 7 se conectará diretamente a ele usando `DATABASE_URL="postgresql://underleaf:underleaf@localhost:5432/underleaf?schema=public"`.

> [!NOTE]
> **Renderização de Interface (ElysiaJS + JSX)**:
> Utilizaremos componentes JSX nativos (`@elysiajs/html`) para renderizar páginas do lado do servidor (Dashboard Admin, Lista de Projetos, Workspace do Editor, Telas de Login/Registro), enriquecidos com bibliotecas de ponta no cliente:
> - **Monaco Editor / CodeMirror**: Para realce de sintaxe LaTeX, números de linha, autocompletes (`\begin{}`, `\cite{}`, `\ref{}`) e marcação de erros de compilação.
> - **PDF.js**: Visualizador embutido com suporte a zoom, navegação de páginas e download direto.
> - **Split.js / Resizable Panels**: Painéis redimensionáveis para Explorer de Arquivos, Editor de Código e Preview de PDF.

---

## 3. Diagramas de Arquitetura

### 3.1. Arquitetura Geral do Sistema

```mermaid
flowchart TD
    Client["Browser do Usuário / Admin"] -->|HTTP / HTML / REST| Elysia["ElysiaJS Server (Bun)"]
    
    subgraph CoreBackend["Backend Underleaf"]
        Elysia --> HTMLPlugin["Plugin @elysiajs/html (Templates JSX)"]
        Elysia --> AuthLayer["Better Auth (RBAC, Sessions, Cookies)"]
        Elysia --> ProjectRouter["Rotas de Projetos & Arquivos"]
        Elysia --> AdminRouter["Rotas Administrativas (Users & Quotas)"]
        Elysia --> CompilerRouter["Serviço de Compilação LaTeX"]
    end

    subgraph DataLayer["Camada de Dados"]
        AuthLayer --> Prisma7["Prisma 7 Client"]
        ProjectRouter --> Prisma7
        AdminRouter --> Prisma7
        Prisma7 --> Postgres[("PostgreSQL 17 (Docker)")]
    end

    subgraph LatexEngine["Motor de Compilação"]
        CompilerRouter --> TectonicRunner["Tectonic LaTeX Runner (./bin/tectonic)"]
        TectonicRunner --> TempWorkspace["Workspace Temporário (storage/builds)"]
        TectonicRunner --> ErrorParser["LaTeX Error/Warning Parser"]
        TempWorkspace --> PDFCache["Cache de PDFs (storage/pdf_cache)"]
    end

    PDFCache -->|PDF Stream / Blob| Client
    HTMLPlugin -->|HTML Renderizado via JSX| Client
```

### 3.2. Fluxo de Compilação LaTeX e Diagnóstico

```mermaid
sequenceDiagram
    autonumber
    actor User as Usuário / Editor
    participant Web as Interface Web (Monaco Editor)
    participant Elysia as Elysia API (/api/projects/:id/compile)
    participant Engine as Tectonic Compiler Engine
    participant DB as Prisma 7 (PostgreSQL)

    User->>Web: Pressiona Ctrl+Enter ou clica "Recompilar"
    Web->>Elysia: POST /api/projects/:id/compile (arquivos modificados)
    Elysia->>DB: Salva alterações dos arquivos no PostgreSQL
    Elysia->>Engine: Dispara compilação isolada no diretório temporário
    Engine->>Engine: Executa ./bin/tectonic main.tex
    alt Compilação Bem-sucedida
        Engine-->>Elysia: Retorna PDF gerado (binário) + Logs limpos
        Elysia->>DB: Registra CompileLog (sucesso, tempo_ms, data)
        Elysia-->>Web: 200 OK { success: true, pdfUrl: "/api/projects/:id/pdf" }
        Web->>Web: Atualiza visualizador PDF.js em tempo real
    else Erro de Sintaxe LaTeX
        Engine-->>Elysia: Retorna Código de Saída != 0 + Stderr/Stdout
        Elysia->>Engine: Parser extrai linhas com erro e mensagens
        Elysia->>DB: Registra CompileLog com erros estruturados
        Elysia-->>Web: 422 Unprocessable { success: false, errors: [...], logs: "..." }
        Web->>Web: Marca linha no Monaco Editor + Exibe Drawer de Logs
    end
```

---

## 4. Modelagem de Dados com Prisma 7

O arquivo [schema.prisma](file:///apps/underleaf/prisma/schema.prisma) modelará entidades do Better Auth e do Underleaf:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String    @id @default(uuid())
  email         String    @unique
  name          String
  password      String?
  role          String    @default("editor") // "admin" | "editor" | "viewer"
  status        String    @default("active") // "active" | "suspended"
  quotaMb       Int       @default(500)
  storageUsedMb Float     @default(0.0)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  avatarUrl     String?

  sessions      Session[]
  accounts      Account[]
  projects      Project[] @relation("UserProjects")
  compileLogs   CompileLog[]
}

model Session {
  id        String   @id @default(uuid())
  userId    String
  token     String   @unique
  expiresAt DateTime
  ipAddress String?
  userAgent String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Account {
  id           String    @id @default(uuid())
  userId       String
  accountId    String
  providerId   String
  password     String?
  accessToken  String?
  refreshToken String?
  expiresAt    DateTime?
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt

  user         User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Verification {
  id         String   @id @default(uuid())
  identifier String
  value      String
  expiresAt  DateTime
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

model Project {
  id               String        @id @default(uuid())
  title            String
  description      String        @default("")
  ownerId          String
  ownerName        String
  template         String        @default("academic-paper")
  compilerEngine   String        @default("tectonic")
  status           String        @default("ready") // "ready" | "compiling" | "error" | "success"
  lastCompiledAt   DateTime?
  hasPdf           Boolean       @default(false)
  storageBytes     Int           @default(0)
  compilationCount Int           @default(0)
  tags             String        @default("[]") // JSON string
  createdAt        DateTime      @default(now())
  updatedAt        DateTime      @updatedAt

  owner            User          @relation("UserProjects", fields: [ownerId], references: [id], onDelete: Cascade)
  files            ProjectFile[]
  compileLogs      CompileLog[]
}

model ProjectFile {
  id        String   @id @default(uuid())
  projectId String
  name      String
  path      String   // ex: "main.tex", "references.bib", "images/fig1.png"
  content   String   // texto ou base64
  isMain    Boolean  @default(false)
  type      String   @default("tex") // "tex" | "bib" | "cls" | "sty" | "image"
  updatedAt DateTime @updatedAt

  project   Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
}

model CompileLog {
  id         String   @id @default(uuid())
  projectId  String
  userId     String
  success    Boolean
  durationMs Int
  errors     String   // JSON string com CompileError[]
  engine     String
  createdAt  DateTime @default(now())

  project    Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model SystemSetting {
  key         String   @id
  value       String
  description String   @default("")
  updatedAt   DateTime @updatedAt
}
```

---

## 5. Estrutura de Arquivos Proposta

```
/apps/underleaf/
├── bin/
│   └── tectonic                      # Binário autônomo do Tectonic (compilador LaTeX)
├── prisma/
│   └── schema.prisma                 # Schema do Prisma 7 configurado para PostgreSQL
├── public/
│   ├── css/
│   │   └── underleaf.css             # Design System moderno, dark-mode, glassmorphism
│   ├── js/
│   │   ├── workspace.js              # Lógica do Monaco Editor, atalhos, compile runner
│   │   └── admin.js                  # Ações dinâmicas do painel de administração
│   └── favicon.ico
├── src/
│   ├── index.ts                      # Servidor principal Elysia com Bun
│   ├── auth.ts                       # Better Auth configurado com adapter Prisma
│   ├── db/
│   │   ├── prisma.ts                 # Instância do PrismaClient 7 e conexão
│   │   ├── seed.ts                   # Criação do Admin padrão, usuários e templates
│   │   └── templates.ts              # Modelos iniciais (Academic, CV, Beamer, Report)
│   ├── latex/
│   │   ├── compiler.ts               # Orquestrador do Tectonic, subprocessos e PDF
│   │   └── error-parser.ts           # Parser de erros LaTeX (linhas, arquivos, avisos)
│   ├── views/                        # Componentes JSX (@elysiajs/html)
│   │   ├── components/
│   │   │   ├── Layout.tsx            # Shell HTML principal com navbar, assets e status
│   │   │   ├── Navbar.tsx            # Barra de navegação com perfil e troca de contexto
│   │   │   ├── Modal.tsx             # Componente de modal genérico para novo projeto
│   │   │   └── Toast.tsx             # Notificações visuais
│   │   ├── pages/
│   │   │   ├── LoginView.tsx         # Tela de Login com Better Auth
│   │   │   ├── RegisterView.tsx      # Tela de Registro de novos usuários
│   │   │   ├── ProjectsView.tsx      # Dashboard do usuário com lista de projetos e filtros
│   │   │   ├── WorkspaceView.tsx     # Editor LaTeX (Split: Arquivos + Monaco + PDF Viewer)
│   │   │   └── AdminDashboardView.tsx # Painel de Administração Avançado
│   ├── routes/
│   │   ├── auth.ts                   # Rotas de login/registro e sessão do Better Auth
│   │   ├── projects.ts               # CRUD de projetos e gerenciamento de arquivos
│   │   ├── compile.ts                # Endpoint de compilação assíncrona e stream do PDF
│   │   └── admin.ts                  # Gestão de usuários, cotas, auditoria e telemetria
│   └── types.ts                      # Definições de tipos TypeScript
├── storage/
│   ├── builds/                       # Workspaces temporários de compilação isolada
│   └── pdf_cache/                    # PDFs compilados para entrega rápida
├── .env                              # DATABASE_URL, PORT, BETTER_AUTH_SECRET
├── package.json
└── README.md
```

---

## 6. Componentes e Funcionalidades Detalhadas

### 6.1. Painel de Administração Avançado (Admin)
- **Gestão de Usuários**:
  - Listagem paginada com status (Ativo/Suspenso), papel (`admin`, `editor`, `viewer`), uso de armazenamento e quantidade de projetos.
  - Ações rápidas: Alterar papel, suspender/reativar conta, redefinir cota de armazenamento (em MB/GB).
  - Modal de criação de novos usuários com definição direta de perfil.
- **Gestão Global de Projetos**:
  - Visão panorâmica de todos os projetos na plataforma.
  - Capacidade do Admin de transferir propriedade, arquivar, excluir ou forçar compilação.
- **Telemetria e Saúde do Sistema**:
  - Monitoramento de uso de CPU, Memória do Bun, conexões com o PostgreSQL e status do binário do Tectonic.
  - Indicador de latência média de compilação.

### 6.2. Workspace de Edição e Pré-Visualização (Overleaf-like)
- **Barra Lateral de Arquivos**:
  - Árvore de arquivos do projeto: criar/renomear/excluir arquivos `.tex`, `.bib`, `.sty`, `.cls`.
  - Indicação clara do arquivo principal (`main.tex`).
- **Editor de Código (Monaco / CodeMirror)**:
  - Sintaxe LaTeX completa com tema moderno escuro.
  - Atalhos: `Ctrl+S` (Salvar), `Ctrl+Enter` (Compilar).
  - Destacar linhas com erros de compilação diretamente no editor.
- **Pré-visualização do PDF em Tempo Real**:
  - Visualizador integrado com barra de ferramentas: Zoom In, Zoom Out, Ajustar à Largura, Ajustar à Página.
  - Navegação de páginas e botão de download do PDF compilado.
  - Botão de exportação do projeto em `.zip`.
- **Painel de Logs e Erros**:
  - Drawer retrátil com aba de **Erros Estruturados** (Arquivo, Linha, Descrição clara do erro LaTeX) e aba de **Log Bruto** do compilador.

### 6.3. Motor de Compilação com Tectonic
- **Execução Segura**:
  - Cada compilação cria um subdiretório isolado em `storage/builds/:projectId/:buildId`.
  - Os arquivos do projeto são materializados no disco.
  - O Tectonic é acionado: `./bin/tectonic --keep-logs --outdir . main.tex`.
  - O Tectonic baixa automaticamente pacotes faltantes de repositórios TeXLive oficiais.
  - O arquivo gerado `main.pdf` é movido para `storage/pdf_cache/:projectId.pdf` e transmitido para o cliente.

---

## 7. Plano de Verificação

### 7.1. Testes Automatizados
1. **Banco de Dados e Prisma 7**:
   - Rodar `bunx prisma db push` para aplicar o schema ao PostgreSQL no Docker.
   - Rodar `bun run src/db/seed.ts` e verificar a criação dos usuários `admin@underleaf.io` e `user@underleaf.io` e dos projetos de template.
2. **Compilação LaTeX com Tectonic**:
   - Executar script de teste automatizado que submete um documento `.tex` de teste com equações e tabelas e valida a geração de um arquivo PDF válido (cabeçalho `%PDF-1.5`).
   - Testar o comportamento do parser de erros enviando um documento `.tex` com erro sintático intencional (ex: `\undefinedcommand`) e verificar se a linha e mensagem são corretamente capturadas.
3. **Autenticação com Better Auth**:
   - Testar endpoints de login e validação de sessão com cookies.
4. **Rotas Administrativas**:
   - Testar que apenas usuários com `role: "admin"` conseguem acessar as rotas de auditoria e alteração de cotas.

### 7.2. Verificação Manual no Navegador
1. Acessar `http://localhost:3000/login` e entrar como Administrador (`admin@underleaf.io` / `admin123`).
2. Abrir o **Painel de Admin** (`/admin`), inspecionar a listagem de usuários e alterar a cota de um usuário.
3. Navegar para a lista de projetos (`/projects`) e criar um novo projeto a partir do template "Academic Research Paper".
4. Abrir o **Workspace** do projeto (`/project/:id`), editar o título do paper no editor e acionar `Ctrl+Enter`.
5. Validar que o visualizador de PDF atualiza com o novo documento compilado em menos de 1 segundo.
6. Clicar em "Download PDF" e conferir o arquivo gerado.
