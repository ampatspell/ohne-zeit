import Component from '@ember/component';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

const isBlank = string => {
  if(typeof string !== 'string') {
    return true;
  }
  return string.trim().length === 0;
}

export default Component.extend({
  classNameBindings: [ ':ui-route', ':index' ],

  latest: readOnly('state.latest.content'),

  pristine: readOnly('latest.text'),
  local: null,

  text: computed('pristine', 'local', {
    get() {
      let { local, pristine } = this.getProperties('local', 'pristine');
      if(local) {
        return local;
      }
      return pristine;
    },
    set(key, value) {
      let pristine = this.get('pristine');
      if(value === pristine) {
        this.set('local', null);
        return pristine;
      }
      this.set('local', value);
      return value;
    }
  }),

  actions: {
    update(value) {
      this.set('text', value);
    },
    enter() {
      this.save();
    }
  },

  save() {
    let { local, pristine } = this.getProperties('local', 'pristine');

    if(isBlank(local)) {
      return;
    }

    local = local.trim();

    if(pristine === local) {
      return;
    }

    this.get('state').createMessage(local).then(() => {
      if(this.isDestroying) {
        return;
      }
      this.set('local', null);
    });
  }

});
