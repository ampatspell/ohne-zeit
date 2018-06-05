import Store from 'ember-cli-zuglet/store';

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

  options

});
