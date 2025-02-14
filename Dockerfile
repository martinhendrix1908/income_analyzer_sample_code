FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json svelte.config.js ./

ARG PUBLIC_NODE_ENV
ENV PUBLIC_NODE_ENV=$PUBLIC_NODE_ENV

ARG SERVER_URL
ENV SERVER_URL=$SERVER_URL

ARG PUBLIC_SERVER_URL
ENV PUBLIC_SERVER_URL=$PUBLIC_SERVER_URL

ARG API_KEY
ENV API_KEY=$API_KEY

ARG PUBLIC_API_KEY
ENV PUBLIC_API_KEY=$PUBLIC_API_KEY

RUN npm install

COPY src/ src/
COPY static/ static/
COPY tsconfig.json /app/
COPY vite.config.ts /app/
COPY tailwind.config.js /app/
COPY postcss.config.js /app/

RUN npm run build

RUN npm prune --production

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/build/ build/
COPY --from=builder /app/node_modules/ node_modules/
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/package-lock.json package-lock.json
COPY --from=builder /app/.svelte-kit/ .svelte-kit/

EXPOSE 3000

CMD [ "node", "-r", "dotenv/config", "build" ]

# docker build --build-arg PUBLIC_NODE_ENV="" --build-arg SERVER_URL="https://apisbx.dmaassociatescorp.com/incomeanalyzer" --build-arg PUBLIC_SERVER_URL="https://apisbx.dmaassociatescorp.com/incomeanalyzer" --build-arg API_KEY="84524e832e184a3b899bea224548e6cd" --build-arg PUBLIC_API_KEY="84524e832e184a3b899bea224548e6cd" --build-arg ORIGIN="http://localhost:3000" -t income_analyzer .