##################
# BUILD BASE IMAGE
##################
FROM node:23-alpine AS base
RUN npm install -g pnpm

#############################
# BUILD FOR LOCAL DEVELOPMENT
#############################
FROM base AS development
WORKDIR /app
RUN chown -R node:node /app
COPY --chown=node:node package*.json pnpm-lock.yaml ./
RUN pnpm install
COPY --chown=node:node . .
USER node

#####################
# BUILD BUILDER IMAGE
#####################
FROM base AS builder
WORKDIR /app
COPY --chown=node:node package*.json pnpm-lock.yaml ./
COPY --chown=node:node --from=development /app/node_modules ./node_modules
COPY --chown=node:node --from=development /app/src ./src
COPY --chown=node:node --from=development /app/public ./public
COPY --chown=node:node --from=development /app/components.json .
COPY --chown=node:node --from=development /app/next.config.ts .
COPY --chown=node:node --from=development /app/tsconfig.json .
COPY --chown=node:node --from=development /app/postcss.config.mjs .
COPY --chown=node:node --from=development /app/tailwind.config.ts .
RUN pnpm build
ENV NODE_ENV=production
RUN pnpm prune --prod
RUN pnpm install --prod
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