import Component from '@ember/component';
import { parallel } from 'ember-animated';
import { fadeOut, fadeIn } from 'ember-animated/motions/opacity';
import move from 'ember-animated/motions/move';
import { easeOut, easeIn } from 'ember-animated/easings/cosine';

const getTransition = ({newItems, oldItems}) => {
  let oldRoute = oldItems[oldItems.length - 1];
  let newRoute = newItems[newItems.length - 1];
  return {
    from: oldRoute && oldRoute.outlets.main.render.name,
    to:   newRoute && newRoute.outlets.main.render.name
  };
};

const duration = 500;

export default Component.extend({
  classNameBindings: [ ':ui-application-outlet' ],

  duration,

  rules({ newItems, oldItems }) {
    let transition = getTransition({ oldItems, newItems });

    if(transition.to === 'index') {
      return function * ({ removedSprites, insertedSprites }) {

        removedSprites.forEach(sprite => {
          fadeOut(sprite, { duration: duration / 3, easing: easeIn });
        });

        insertedSprites.forEach(sprite => {
          sprite.startAtPixel({ y: -30 });
          return parallel(
            move(sprite, { easing: easeOut }),
            fadeIn(sprite, { easing: easeOut })
          );
        });

      };
    }
  }

});
