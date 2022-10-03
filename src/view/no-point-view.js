import {createElement} from '../render.js';
import {arrayRandElement} from '../mock/util.js';

const createNoPointTemplate = () => {
  const messagesError = [
    'Click New Event to create your first point',
    'There are no past events now',
    'There are no future events now'
  ];

  return (
    `<p class="trip-events__msg">${arrayRandElement(messagesError)}</p>`
  );
};

export default class NoPointView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createNoPointTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
