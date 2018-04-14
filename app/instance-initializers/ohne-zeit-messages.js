export default {
  name: 'ohne-zeit:messages',
  initialize(app) {

    window.messages = async () => {
      let store =  app.lookup('service:store');
      let ref = store.collection('messages').orderBy('created_at', 'desc');
      let query = ref.query({ type: 'array' });
      await query.load();
      return query.get('content').map(doc => doc.get('data').getProperties('created_at', 'text'));
    }

  }
};
