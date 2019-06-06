'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    'asset-cache': {
      include: [
        'assets/**/*'
      ]
    }
  });

  return app.toTree();
};
