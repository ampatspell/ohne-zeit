import Model from 'ember-cli-zug/model/transient';
import { query } from 'ember-cli-zug/model/computed';
import { serverTimestamp } from 'ember-cli-zug/utils';
import { resolve } from 'rsvp';

export default Model.extend({

  ready() {
    return this.get('context.ready');
  },

  restore() {
    return resolve()
      .then(() => this.ready())
      .then(() => this);
  },

  latest: query({
    type: 'single',
    query: db => db.collection('messages').orderBy('created_at', 'desc')
  }),

  all: query({
    type: 'array',
    query: db => db.collection('messages').orderBy('created_at', 'desc')
  }),

  message(data) {
    return this.get('context').model({
      name: 'message',
      collection: 'messages',
      data
    });
  },

  createMessage(text) {
    let message = this.message({ text, created_at: serverTimestamp() })
    return message.save();
  }

});
