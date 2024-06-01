FROM node:latest AS deps
RUN apt-get update && apt upgrade -y && \ 
    apt-get install -y \
    libgtk2.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    xauth \
    xvfb && \
    apt clean
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
COPY ./apps/simulator/package.json ./apps/simulator/
COPY ./packages/ui/package.json ./packages/ui/
COPY ./packages/utils/package.json ./packages/utils/
COPY ./packages/typescript-config/package.json ./packages/typescript-config/
ENV npm_config_loglevel warn
ENV CI=true
RUN npm install
RUN npm audit --audit-level=critical --json

FROM node:18.18.2-alpine3.17 AS builder
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/ ./
COPY ./apps/simulator/ ./apps/simulator/
COPY ./packages/ ./packages/
COPY turbo.json ./
RUN npm run build

FROM node:18.18.2-alpine3.17 AS runner
WORKDIR /usr/src/app
ENV NODE_ENV production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
COPY --from=builder /usr/src/app/apps/simulator/next.config.js ./next.config.js
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/apps/simulator/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/apps/simulator/package.json ./package.json
USER nextjs
CMD ["npm", "start"]
