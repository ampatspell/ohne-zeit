import Component from '@ember/component';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

const isBlank = string => {
  if(typeof string !== 'string') {
    return true;
  }
  return string.trim().length === 0;
};

export default Component.extend({
  classNameBindings: [ ':ui-route', ':index' ],

  pristine: readOnly('model.latest.content.data.text'),
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
    rollback(e) {
      this.set('local', null);
      this._blur(e);
    },
    enter(e) {
      this.save();
      this._blur(e);
    }
  },

  _blur(e) {
    e.target.blur();
    window.getSelection().removeAllRanges();
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

    this.model.addMessage(local).then(() => {
      if(this.isDestroying) {
        return;
      }
      this.set('local', null);
    });
  }

});
