import Store from 'ember-cli-zuglet/store';
import { computed } from '@ember/object';

const options = {
  firebase: {
    apiKey: "AIzaSyDyjC_rsH7_BYJwjKgIrHhoSvRBfNnjGrQ",
    authDomain: "ohne-zeit.firebaseapp.com",
    databaseURL: "https://ohne-zeit.firebaseio.com",
    projectId: "ohne-zeit",
    storageBucket: "ohne-zeit.appspot.com",
    messagingSenderId: "491555737764"
  },
  firestore: {
    persistenceEnabled: true
  }
};

export default Store.extend({

  options,

  restore() {
  },

  messagesRef: computed(function() {
    return this.collection('messages');
  }),

  latest: computed(function() {
    let ref = this.get('messagesRef').orderBy('created_at', 'desc');
    return ref.query({ type: 'first' });
  }).readOnly(),

  async loadLatest() {
    let latest = this.get('latest');
    await latest.load();
    latest.observe();
    return latest;
  },

  async addMessage(text) {
    let doc = this.get('messagesRef').doc().new();
    doc.get('data').setProperties({
      text,
      created_at: this.serverTimestamp()
    });
    await doc.save();
  },

});
