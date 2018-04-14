import Store from 'ember-cli-zuglet/store';
import serverTimestamp from 'ember-cli-zuglet/util/server-timestamp';
import { computed } from '@ember/object';
import { resolve } from 'rsvp';

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
    return resolve()
      .then(() => this.get('ready'))
      .then(() => this);
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
      created_at: serverTimestamp()
    });
    await doc.save();
  },

});
