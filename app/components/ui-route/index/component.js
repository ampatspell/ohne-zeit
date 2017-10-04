import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [ ':ui-route', ':index' ],

  actions: {
    update(value) {
      this.set('message.content', value);
    },
    enter() {
      this.save();
    }
  },

  async save() {
    let message = this.get('message');
    let content = message.get('content') || '';
    if(content.trim().length === 0) {
      return;
    }
    await message.save();
  }

});
