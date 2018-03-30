// import fetch from 'fetch';
// import { all } from 'rsvp';

// const url = 'http://dev.amateurinmotion.com:6016/ohne-zeit/message%3Asingle';
// const json = (...args) => fetch(...args).then(res => res.json());

// const migrate = async store => {
//   let info = await json(`${url}?revs=true`);
//   let start = info._revisions.start;
//   let revs = info._revisions.ids.map((rev, idx) => `${start-idx}-${rev}`);
//   let docs = await all(revs.map(rev => json(`${url}?rev=${rev}`)));
//   let now = Date.parse("2018-03-30T18:00:00.999Z");

//   let models = docs.map(doc => {
//     now-=1000;
//     let data = { created_at: new Date(now), text: doc.content };
//     return store.model({ name: 'message', collection: 'messages', data });
//   });

//   models = models.sortBy('createdAt');
//   console.log(models.get('length'));

//   await all(models.map(model => model.get('doc').save()));
// }

export default {
  name: 'ohne-zeit:injections',
  after: 'ohne-zeit:store',
  initialize(app) {
    app.inject('component', 'router', 'service:router');
    // migrate(app.lookup('service:store'));
  }
};
