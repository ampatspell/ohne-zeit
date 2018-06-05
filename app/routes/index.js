import Route from '@ember/routing/route';
import { computed } from '@ember/object';
import observed from 'ember-cli-zuglet/experimental/observed';
import model from 'ember-cli-zuglet/experimental/model/route';

export default Route.extend({

  model: model({

    messages: computed(function() {
      return this.store.collection('messages');
    }),

    latest: observed(),

    prepare() {
      let latest = this.messages.orderBy('created_at', 'desc').query({ type: 'first' });

      this.setProperties({
        latest
      });

      return latest.load();
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
