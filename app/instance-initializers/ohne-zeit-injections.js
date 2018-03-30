export default {
  name: 'ohne-zeit:injections',
  after: 'ohne-zeit:store',
  initialize(app) {
    app.inject('component', 'router', 'service:router');
  }
};
