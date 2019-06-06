import Route from '@ember/routing/route';
import { computed } from '@ember/object';
import { observed, route, resolveObservers } from 'ember-cli-zuglet/lifecycle';

export default Route.extend({

  model: route().inline({

    messages: computed(function() {
      return this.store.collection('messages');
    }),

    latest: observed().owner('messages').content(({ messages }) => messages.orderBy('created_at', 'desc').query({ type: 'first' })),

    prepare() {
    },

    async load() {
      await resolveObservers(this.latest);
    },

    async addMessage(text) {
      let doc = this.messages.doc().new();
      doc.data.setProperties({
        text,
        created_at: this.store.serverTimestamp()
      });
      await doc.save();
    },

  })

});
