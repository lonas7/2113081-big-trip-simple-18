//import AddFormView from '../view/creation-form-view.js';
import EditFormView from '../view/edit-form-view.js';
import PointOfRouteView from '../view/point-of-route-view.js';
import BodyContainerView from '../view/body-container-view.js';


import {render} from '../render.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointModel = null;

  #boardComponent = new BodyContainerView();

  #boardPoints = [];

  init = (boardContainer, pointModel) => {

    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
    this.#boardPoints = [...this.#pointModel.points];

    render(this.#boardComponent, this.#boardContainer);

    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i]);
    }
  };

  #renderPoint = (point) => {
    const pointComponent = new PointOfRouteView(point);
    const pointEditComponent = new EditFormView(point);

    const replacePointToForm = () => {
      this.#boardComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#boardComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.querySelector('.event__save-btn').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
    });

    render(pointComponent, this.#boardComponent.element);
  };

}
