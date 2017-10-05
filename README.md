# ohne-zeit

Silly Ember.js app

``` yml
# docker-compose.yml
version: "3"
services:
  app:
    image: ampatspell/ohne-zeit:latest
    ports:
      - 5000:5000
    environment:
      - COUCH_URL=http://server.com:5001
      - DATABASE_NAME=ohne-zeit
      - CHANGES_FEED=event-source
      - DIST=/app/dist
      - PORT=5000
    links:
      - couchdb
  couchdb:
    image: klaemo/couchdb:1.6
    environment:
      - COUCHDB_USER=admin
      - COUCHDB_PASSWORD=hello
    ports:
      - "5001:5984"
```
