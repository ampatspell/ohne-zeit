FROM node:6.11-alpine as ember

COPY . /app
WORKDIR /app

RUN rm -f /app/.env

RUN npm install --quiet && \
    npm run build -- -prod

WORKDIR /app/dist

RUN npm install --quiet


FROM node:6.11-alpine as server

COPY ./fastboot-server /app
WORKDIR /app

RUN npm install --quiet


FROM node:6.11-alpine as runtime

COPY --from=server /app /app
COPY --from=ember /app/dist /app/dist
WORKDIR /app

ENTRYPOINT [ "npm", "start" ]
