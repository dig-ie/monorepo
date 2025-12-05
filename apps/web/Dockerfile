# apps/web/Dockerfile
FROM node:20-alpine AS development
WORKDIR /app

ENV DOCKER_ENV=true

# 1. Instala pnpm
RUN npm install -g pnpm

# 2. Copia em camadas para cache
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages ./packages
COPY apps/web ./apps/web

# 3. Instala
RUN pnpm install

EXPOSE 3000

# 4. Comando EXATO do teste
WORKDIR /app/apps/web
CMD ["pnpm", "dev"]