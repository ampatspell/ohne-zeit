import Ember from 'ember';

const {
  on,
  observer
} = Ember;

export default Ember.Component.extend({
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

  _valueDidChange: observer('value', function() {
    this._updateInnerText();
  }),

  _start: on('didInsertElement', function() {
    this._updateInnerText();
    this.$().on('paste', () => false);
  }),

  _stop: on('willDestroyElement', function() {
    this.$().off('paste');
  }),

  keyDown(e) {
    if(e.keyCode === 13) {
      this.attrs.enter && this.attrs.enter();
      this.$().blur();
      return false;
    }
    return true;
  },

  keyUp() {
    let el = this.get('element');
    let value = el.innerText;
    this.attrs.update && this.attrs.update(value);
  }

});
