import Route from '@ember/routing/route';

export default Route.extend({

  model() {
    let state = this.get('state');
    return state.get('latest').load().then(() => state);
  }

});
