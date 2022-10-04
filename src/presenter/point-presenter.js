import {render, replace, remove} from '../framework/render.js';
import PointOfRouteView from '../view/point-of-route-view.js';
import EditFormView from '../view/edit-form-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #boardComponent = null;
  #changeMode = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;
  #mode = Mode.DEFAULT;

  constructor (boardComponent, changeMode) {
    this.#boardComponent = boardComponent;
    this.#changeMode = changeMode;
  }

  init = (point) => {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointOfRouteView(point);
    this.#pointEditComponent = new EditFormView(point);

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointEditComponent.setEditClickHandler(this.#handleEditClick2);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);

    if (prevPointComponent === null || prevPointEditComponent === null){
      render(this.#pointComponent, this.#boardComponent);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  };

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleEditClick2 = () => {
    this.#replaceFormToPoint();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
  };
}

//     const replacePointToForm = () => {
//       replace(pointEditComponent, pointComponent);
//     };

//     const replaceFormToPoint = () => {
//       replace(pointComponent, pointEditComponent);
//     };

//     const onEscKeyDown = (evt) => {
//       if (evt.key === 'Escape' || evt.key === 'Esc') {
//         evt.preventDefault();
//         replaceFormToPoint();
//         document.removeEventListener('keydown', onEscKeyDown);
//       }
//     };

//     pointComponent.setEditClickHandler(() => {
//       replacePointToForm();
//       document.addEventListener('keydown', onEscKeyDown);
//     });

//     pointEditComponent.setEditClickHandler(() => {
//       replaceFormToPoint();
//       document.removeEventListener('keydown', onEscKeyDown);
//     });

//     pointEditComponent.setFormSubmitHandler(() => {
//       replaceFormToPoint();
//     });

//     render(pointComponent, this.#boardComponent.element);
// }
