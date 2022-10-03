import {createElement} from '../render.js';

const createBodyContainerTemplate = () => (
  `<section class="trip-events">
  </section>`
);

export default class BodyContainerView {
  #element = null;

  get template() {
    return createBodyContainerTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
