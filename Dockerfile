FROM node:lts-alpine AS base

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Read more at: https://nextjs.org/docs/messages/sharp-missing-in-production
FROM base AS depends

RUN npm i sharp

FROM base AS runner

RUN npm i -g pm2

COPY --chown=node:node .next/standalone ./
COPY --chown=node:node .next/static ./.next/static
COPY --chown=node:node public ./public
COPY --chown=node:node ecosystem.config.js ./ecosystem.config.js

COPY --from=depends --chown=node:node /app/node_modules ./node_modules

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

EXPOSE 3000

USER node

ENTRYPOINT ["pm2-runtime", "ecosystem.config.js"]
