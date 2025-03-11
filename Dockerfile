##################
# BUILD BASE IMAGE
##################
FROM node:23-alpine AS base
RUN apk add --no-cache libc6-compat # ref: https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
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
COPY --chown=node:node --from=development /app/tsconfig.json ./tsconfig.json
COPY --chown=node:node --from=development /app/components.json ./components.json
COPY --chown=node:node --from=development /app/next-env.d.ts ./next-env.d.ts
COPY --chown=node:node --from=development /app/next.config.ts ./next.config.ts
COPY --chown=node:node --from=development /app/postcss.config.mjs ./postcss.config.mjs
COPY --chown=node:node --from=development /app/tailwind.config.ts ./tailwind.config.ts
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
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/.next ./.next
COPY --chown=node:node --from=builder /app/package.json ./package.json
COPY --chown=node:node --from=builder /app/next.config.ts ./next.config.ts
USER node
CMD ["pnpm", "start"]