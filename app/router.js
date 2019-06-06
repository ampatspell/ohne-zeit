import EmberRouter from '@ember/routing/router';
import config from './config/environment';

let _doneLoading = false;
const doneLoading = () => {
  if(_doneLoading) {
    return;
  }
  _doneLoading = true;
  let el = document.querySelector('.ui-application-loading');
  el.style.display = 'none';
};

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,

  routeDidChange() {
    doneLoading();
  },

  init() {
    this._super(...arguments);
    this.on('routeDidChange', () => this.routeDidChange());
  }

});

Router.map(function() {
});

export default Router;
