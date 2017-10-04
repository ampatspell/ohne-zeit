import Ember from 'ember';

const id = 'message:single';

export default Ember.Route.extend({

  async model() {
    let db = this.get('db');
    let doc;
    try {
      doc = await db.find(id);
    } catch(err) {
      if(err.error !== 'not_found') {
        throw err;
      }
      doc = db.doc({
        id,
        type: 'message',
        content: 'To whom it may concern: It is springtime. It is late afternoon.'
      });
      await doc.save();
    }

    return doc;
  }

});
