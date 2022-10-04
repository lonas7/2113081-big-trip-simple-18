import AbstractView from '../framework/view/abstract-view.js';
import {arrayRandElement} from '../utils/common.js';

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

export default class NoPointView extends AbstractView {
  get template() {
    return createNoPointTemplate();
  }
}
