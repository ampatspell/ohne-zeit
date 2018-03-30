import Model from 'ember-cli-zug/model/persisted';
import { id, attr } from 'ember-cli-zug/model/persisted/computed';
import { serverTimestamp } from 'ember-cli-zug/utils';

export default Model.extend({

  id: id(),
  createdAt: attr({ key: 'created_at' }),
  text: attr(),

  save() {
    let doc = this.get('doc');
    if(doc.get('isNew')) {
      this.set('createdAt', serverTimestamp());
    }
    return doc.save();
  }

});
