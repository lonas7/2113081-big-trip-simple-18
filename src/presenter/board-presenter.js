import {render, replace, remove} from '../framework/render.js';

//import AddFormView from '../view/creation-form-view.js';
import EditFormView from '../view/edit-form-view.js';
import PointOfRouteView from '../view/point-of-route-view.js';
import BodyContainerView from '../view/body-container-view.js';
import NoPointView from '../view/no-point-view.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointModel = null;

  #boardComponent = new BodyContainerView();

  #boardPoints = [];

  constructor (boardContainer, pointModel) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
  }

  init = () => {
    this.#boardPoints = [...this.#pointModel.points];

    this.#renderBoard();
  };

  #renderPoint = (point) => {
    const pointComponent = new PointOfRouteView(point);
    const pointEditComponent = new EditFormView(point);

    const replacePointToForm = () => {
      replace(pointEditComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setEditClickHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
    });

    render(pointComponent, this.#boardComponent.element);
  };

  #renderBoard = () => {

    render(this.#boardComponent, this.#boardContainer);

    if ( this.#boardPoints.every((task) => task.isArchive)) {
      render(new NoPointView(), this.#boardComponent.element);
    } else {
      for (let i = 0; i < this.#boardPoints.length; i++) {
        this.#renderPoint(this.#boardPoints[i]);
      }
    }
  };
}
