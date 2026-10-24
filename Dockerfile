ARG NODE_VERSION=26.12.1
ARG PNPM_VERSION=12.15.0

FROM node:${NODE_VERSION}-slim AS base

WORKDIR /app

ARG PNPM_VERSION
RUN npm install --global pnpm@${PNPM_VERSION}

FROM base AS dependencies

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder

COPY --from=dependencies /app/node_modules ./node_modules
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY next.config.ts next-env.d.ts svgr.d.ts tsconfig.json ./
COPY src ./src
COPY public ./public

RUN pnpm build:prod

FROM node:${NODE_VERSION}-slim AS runner

WORKDIR /app
ARG PORT=3000
ENV NODE_ENV=production
ENV PORT=${PORT}
ENV HOSTNAME=0.0.0.0

COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE ${PORT}

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + process.env.PORT + '/api/health').then(response => process.exit(response.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "server.js"]
