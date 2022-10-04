import {render, RenderPosition} from '../framework/render.js';

//import AddFormView from '../view/creation-form-view.js';
//import EditFormView from '../view/edit-form-view.js';
//import PointOfRouteView from '../view/point-of-route-view.js';
import SortingView from '../view/sorting-view.js';
import BodyContainerView from '../view/body-container-view.js';
import NoPointView from '../view/no-point-view.js';
import {sortDay, sortPrice} from '../utils/point-utils.js';
import {SortType} from '../const/const.js';
import {updateItem} from '../utils/common.js';

import PointPresenter from './point-presenter.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointModel = null;

  #boardComponent = new BodyContainerView();
  #sortComponent = new SortingView();
  #noPointComponent = new NoPointView();

  #boardPoints = [];

  #pointPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedBoardPoints = [];

  constructor (boardContainer, pointModel) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
  }

  init = () => {
    this.#boardPoints = [...this.#pointModel.points];
    this.#sourcedBoardPoints = [...this.#pointModel.points];

    this.#renderBoard();
  };

  #hendleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.DAY:
        this.#boardPoints.sort(sortDay);
        break;
      case SortType.PRICE:
        this.#boardPoints.sort(sortPrice);
        break;
      default:
        this.#boardPoints = [...this.#sourcedBoardPoints];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);

    this.#clearPointsBoard();
    this.#renderSort();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#boardComponent.element, this.#handlePointChange, this.#hendleModeChange);
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
      this.#renderSort();
      this.#renderPoints();
    }
  };
}

