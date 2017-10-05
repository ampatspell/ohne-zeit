/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    'ember-cli-fastboot-dotenv': {
      keys: [ 'COUCH_URL', 'DATABASE_NAME', 'CHANGES_FEED' ]
    }
  });

  return app.toTree();
};
