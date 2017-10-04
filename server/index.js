const path = require('path');
const express = require('express');
const fastboot = require('fastboot-express-middleware');

const dist = process.env.DIST;
const port = process.env.PORT;

const app = express();

app.use(express.static(dist, { index: false, maxAge: '1 year' }));
app.get('/*', fastboot(dist));

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
