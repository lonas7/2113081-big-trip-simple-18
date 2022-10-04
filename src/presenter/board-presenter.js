import {render, RenderPosition} from '../framework/render.js';

//import AddFormView from '../view/creation-form-view.js';
//import EditFormView from '../view/edit-form-view.js';
//import PointOfRouteView from '../view/point-of-route-view.js';
import BodyContainerView from '../view/body-container-view.js';
import NoPointView from '../view/no-point-view.js';

import PointPresenter from './point-presenter.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointModel = null;

  #boardComponent = new BodyContainerView();
  #noPointComponent = new NoPointView();

  #boardPoints = [];

  #pointPresenter = new Map();

  constructor (boardContainer, pointModel) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
  }

  init = () => {
    this.#boardPoints = [...this.#pointModel.points];

    this.#renderBoard();
  };

  #hendleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#boardComponent.element, this.#hendleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.pid, pointPresenter);
  };

  #renderNoPoints = () => {
    render(this.#noPointComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  };


  #renderPoints = () => {
    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i]);
    }
  };

  #clearPointsBoard = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #renderBoard = () => {

    render(this.#boardComponent, this.#boardContainer);

    if ( this.#boardPoints.every((task) => task.isArchive)) {
      this.#renderNoPoints();
    } else {
      this.#renderPoints();
    }
  };
}

