export default {
  name: 'ohne-zeit:documents',
  after: 'ember-cli-fastboot-dotenv',
  initialize(app) {
    let dotenv = app.lookup('service:dotenv');
    let stores = app.lookup('documents:stores');

    let {
      couchURL:     url,
      databaseName: name,
      changesFeed:  feed
    } = dotenv.getProperties('couchURL', 'databaseName', 'changesFeed');

    let store = stores.store({ url });
    store.enableFastBootWithIdentifier('ohne-zeit-documents');

    let db = store.database(name);

    let changes = db.changes({ feed });
    changes.start();

    app.register('service:db', db, { instantiate: false });

    app.inject('route',     'db', 'service:db');
    app.inject('component', 'db', 'service:db');
  }
};
