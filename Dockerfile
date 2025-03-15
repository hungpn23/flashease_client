##################
# BUILD BASE IMAGE
##################
FROM node:23-alpine AS base
RUN npm install -g pnpm

###################
# BUILD FOR BUILDER
###################
FROM base AS builder
WORKDIR /app
RUN chown -R node:node /app
COPY --chown=node:node package*.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY --chown=node:node . .
RUN pnpm build
ENV NODE_ENV=production
RUN pnpm prune --prod
USER node

######################
# BUILD FOR PRODUCTION
######################
FROM base AS production
WORKDIR /app
COPY --chown=node:node --from=builder /app/public ./public
COPY --chown=node:node --from=builder /app/.next/standalone .
COPY --chown=node:node --from=builder /app/.next/static ./.next/static
USER node
CMD ["node", "server.js"]