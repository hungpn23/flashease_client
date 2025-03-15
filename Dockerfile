##################
# BUILD BASE IMAGE
##################
FROM node:23-alpine AS base
RUN npm install -g pnpm

#####################
# BUILD BUILDER IMAGE
#####################
FROM base AS builder
WORKDIR /app

COPY --chown=node:node package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY --chown=node:node next.config.ts ./
COPY --chown=node:node tsconfig.json ./
COPY --chown=node:node components.json ./
COPY --chown=node:node postcss.config.mjs ./
COPY --chown=node:node tailwind.config.ts ./
COPY --chown=node:node public/ ./public/
COPY --chown=node:node src/ ./src/

RUN pnpm build

ENV NODE_ENV=production
RUN pnpm prune --prod

######################
# BUILD FOR PRODUCTION
######################
FROM base AS production
WORKDIR /app

# Copy các file cần thiết từ builder
COPY --chown=node:node --from=builder /app/public ./public
COPY --chown=node:node --from=builder /app/.next/standalone ./
COPY --chown=node:node --from=builder /app/.next/static ./.next/static

USER node
CMD ["node", "server.js"]