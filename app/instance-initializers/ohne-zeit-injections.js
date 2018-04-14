export default {
  name: 'ohne-zeit:injections',
  initialize(app) {
    app.inject('component', 'router', 'service:router');
  }
};
