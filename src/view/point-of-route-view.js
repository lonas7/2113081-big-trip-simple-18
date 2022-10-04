import AbstractView from '../framework/view/abstract-view.js';
import { getRandomInteger, } from '../utils/common.js';
import { humanizeTaskDueDate } from '../utils/common.js';

const createPointOfRouteTemplate = (point) => {
  const {basePrice, dueDate, dueDate2, destination, type} = point;
  const dateFrom = humanizeTaskDueDate(dueDate);
  const dateTo = humanizeTaskDueDate(dueDate2);

  return (
    `<ul class="trip-events__list">
            <li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18">MAR ${getRandomInteger(1,31)}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destination}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="2019-03-18T10:30">${dateFrom}</time>
                    &mdash;
                    <time class="event__end-time" datetime="2019-03-18T11:00">${dateTo}</time>
                  </p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  <li class="event__offer">
                    <span class="event__offer-title">Order Uber</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">20</span>
                  </li>
                </ul>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>
        </ul>`
  );
};

export default class PointOfRouteView extends AbstractView {
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createPointOfRouteTemplate(this.#point);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };
}
