
# JungleGaming — Desafio Full-Stack (Entrega Parcial)

> ⚠️ Repositório de continuidade (vou evoluir este projeto pessoalmente após a avaliação):  
https://github.com/dig-ie/monorepo-collaborative-task-system

## O que foi implementado (até agora)

Base do projeto focada em **infra + fundações** para destravar a arquitetura de microsserviços:

- ✅ Monorepo com **pnpm workspaces** + **Turborepo**
- ✅ Serviços criados: `api-gateway`, `auth-service`, `tasks-service`, `notifications-service`, `web`
- ✅ Padronização compartilhada:
  - ✅ `packages/tsconfig` (presets TypeScript)
  - ✅ `packages/eslint-config` (config ESLint compartilhada)
- ✅ Stack dev via Docker (compose + Dockerfiles por serviço)
- ✅ Postgres + TypeORM (base):
  - ✅ config de datasource + estrutura de migrations
  - ✅ runner `migration:run` e validação de conectividade executando migrations
- ✅ RabbitMQ (bootstrap):
  - ✅ options/config RMQ por serviço
  - ✅ bootstrap do microservice em `main.ts` (auth/tasks/notifications)
  - ✅ scaffolds iniciais de consumer/publisher (placeholders)
- ✅ Workflow dev “Windows-friendly”:
  - ✅ hot reload/watch funcionando via ajustes de polling (TS config + watcher)

## Como rodar (dev)

### Requisitos
- Docker + Docker Compose
- pnpm (opcional se você rodar somente via Docker)

### Subir a stack
```bash
docker compose up --build
```

### URLs / Portas úteis
| Componente | URL / Porta |
|---|---|
| Web (Vite) | http://localhost:3000 |
| API Gateway | http://localhost:3001 |
| Auth service | http://localhost:3002 |
| Tasks service | http://localhost:3003 |
| Notifications service | http://localhost:3004 |
| Postgres | localhost:5432 |
| RabbitMQ (AMQP) | localhost:5672 |
| RabbitMQ Management | http://localhost:15672 (admin/admin) |

### Migrations (exemplo)
Rodar em cada serviço (ou via shell do container):
```bash
pnpm --filter tasks-service migration:run
pnpm --filter auth-service migration:run
pnpm --filter notifications-service migration:run
```

## O que falta (próximos passos)

Backend (requisitos centrais):
- ⏳ **Auth-service**: entidade User + `/register`, `/login`, `/refresh` (JWT access + refresh), hash de senha
- ⏳ **API Gateway**: endpoints HTTP + JWT guard/strategy + Swagger `/api/docs`
- ⏳ **Tasks-service**: CRUD completo + comentários + assignees + histórico (entidades + migrations)
- ⏳ **Eventos RabbitMQ**: publicar `task.created`, `task.updated`, `task.comment.created`
- ⏳ **Notifications-service**: consumir eventos RMQ + persistir notificações + WebSocket gateway + salas `user:{id}`

Frontend:
- ⏳ Telas de auth (login/register) + integração com TanStack Query
- ⏳ UI de tarefas (lista/detalhe/comentários) + notificações via WS (toasts)

## Testes mínimos (planejados)

- ⏳ Auth-service: fluxo feliz de register/login (e2e ou integration)
- ⏳ Tasks-service: criar tarefa + emitir evento (integration)
- ⏳ API Gateway: rota protegida retorna 401 sem JWT (e2e)

## Notas

- Priorizei **fundação, tooling, DX e estabilidade de infra** primeiro (monorepo, padrões, Docker, migrations, bootstrap RMQ).
- Nomes/handlers de eventos e endpoints de negócio ficam como próxima etapa para fechar o escopo funcional.

—
Diego Ferreira (dig-ie)