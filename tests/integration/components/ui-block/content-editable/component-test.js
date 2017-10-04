import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-block/content-editable', 'Integration | Component | ui block/content editable', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ui-block/content-editable}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ui-block/content-editable}}
      template block text
    {{/ui-block/content-editable}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
