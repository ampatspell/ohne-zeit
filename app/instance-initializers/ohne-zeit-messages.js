
export default {
  name: 'ohne-zeit:messages',
  after: 'ohne-zeit:store',
  initialize(app) {

    window.messages = async () => {
      let all = app.lookup('service:state').get('all');
      await all.load();
      return all.get('content').map(model => model.getProperties('createdAt', 'text'));
    }

  }
};
