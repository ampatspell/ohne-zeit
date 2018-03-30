import registerContextService from 'ember-cli-zug/register-context-service';
import registerModelService from 'ember-cli-zug/register-model-service';

let firebase = {
  apiKey: "AIzaSyDyjC_rsH7_BYJwjKgIrHhoSvRBfNnjGrQ",
  authDomain: "ohne-zeit.firebaseapp.com",
  databaseURL: "https://ohne-zeit.firebaseio.com",
  projectId: "ohne-zeit",
  storageBucket: "ohne-zeit.appspot.com",
  messagingSenderId: "491555737764"
};

let modelNameForDocument = document => {
  if(document.get('collection') === 'messages') {
    return 'message';
  }
};

export default {
  name: 'ohne-zeit:store',
  initialize(app) {

    // register root context as a 'store' service
    let store = registerContextService({
      app,
      firebase,
      modelNameForDocument
    });

    // create transient model in root context and register it as a `state` service
    registerModelService({
      app,
      store,
      name: 'state'
    });

  }
};
