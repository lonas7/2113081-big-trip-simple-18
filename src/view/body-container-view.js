import AbstractView from '../framework/view/abstract-view.js';

const createBodyContainerTemplate = () => (
  `<section class="trip-events">
  </section>`
);

export default class BodyContainerView extends AbstractView {
  get template() {
    return createBodyContainerTemplate();
  }
}
