import environment from '../config/environment';

const {
  url,
  database,
  feed
} = environment.APP.couch;

export default {
  name: 'ohne-zeit:documents',
  initialize(app) {
    let stores = app.lookup('documents:stores');

    let store = stores.store({ url });
    store.enableFastBootWithIdentifier('ohne-zeit-documents');

    let db = store.database(database);

    let changes = db.changes({ feed });
    changes.start();

    app.register('service:db', db, { instantiate: false });

    app.inject('route',     'db', 'service:db');
    app.inject('component', 'db', 'service:db');
  }
};
