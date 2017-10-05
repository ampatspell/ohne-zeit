const path = require('path');
const express = require('express');
const fastboot = require('fastboot-express-middleware');

const {
  DIST,
  PORT,
  COUCH_URL,
  DATABASE_NAME,
  CHANGES_FEED
} = process.env;

console.log(JSON.stringify({ DIST, PORT, COUCH_URL, DATABASE_NAME, CHANGES_FEED }, null, 2));

const app = express();

app.use(express.static(DIST, { index: false, maxAge: '1 year' }));
app.get('/*', fastboot(DIST));

app.listen(PORT, function () {
  console.log('Listening…');
});
