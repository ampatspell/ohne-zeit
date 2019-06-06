import Component from '@ember/component';
import { observer } from '@ember/object';

export default Component.extend({
  classNameBindings: [ ':ui-block', ':content-editable' ],
  attributeBindings: [ 'contenteditable' ],

  contenteditable: true,

  value: null,

  _updateInnerText() {
    let value = this.get('value') || '';
    let el = this.get('element');
    if(el.innerText === value) {
      return;
    }
    el.innerText = value;
  },

  _valueDidChange: observer('value', function() { // eslint-disable-line ember/no-observers
    this._updateInnerText();
  }),

  didInsertElement() {
    this._super(...arguments);
    this._updateInnerText();
    this.$().on('paste', () => false);
  },

  willDestroyElement() {
    this._super(...arguments);
    this.$().off('paste');
  },

  keyDown(e) {
    if(e.keyCode === 13) {
      let enter = this.get('enter');
      enter && enter();
      this.$().blur();
      return false;
    }
    return true;
  },

  keyUp() {
    let el = this.get('element');
    let value = el.innerText;
    let update = this.get('update');
    update && update(value);
  }

});
