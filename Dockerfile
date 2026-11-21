# syntax=docker/dockerfile:1
FROM node:24-alpine AS deps
ENV HUSKY=0
ENV COREPACK_HOME=/opt/corepack COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM deps AS build
COPY . .
RUN yarn run build

FROM node:24-alpine AS runtime
ENV NODE_ENV=production HOST=0.0.0.0 HUSKY=0
ENV PORT=3000
ENV COREPACK_HOME=/opt/corepack COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production
COPY --chown=node:node . .
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/public ./public
COPY --from=build --chown=node:node /app/server ./server
COPY --from=build --chown=node:node /app/dist ./dist
USER node
EXPOSE 3000
HEALTHCHECK --interval=10s --timeout=3s --start-period=20s --retries=3 \
  CMD test ! -f /tmp/draining && wget -qO- http://127.0.0.1:3000/ >/dev/null || exit 1
CMD ["yarn","start"]
