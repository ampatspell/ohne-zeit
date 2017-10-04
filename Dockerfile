FROM node:6.11-alpine as ember

ENV COUCH_URL=http://server:5984
ENV DATABASE_NAME=ohne-zeit
ENV CHANGES_FEED=event-source

COPY . /app
WORKDIR /app

RUN npm install --quiet && \
    npm run build -- -prod

WORKDIR /app/dist

RUN npm install --quiet


FROM node:6.11-alpine as server

COPY ./server /app
WORKDIR /app

RUN npm install --quiet


FROM node:6.11-alpine as runtime

COPY --from=server /app /app
COPY --from=ember /app/dist /app/dist
WORKDIR /app

ENV DIST=/app/dist
ENV PORT=3000

ENTRYPOINT [ "npm", "start" ]
