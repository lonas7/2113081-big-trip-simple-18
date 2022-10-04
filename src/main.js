import {render} from './framework/render.js';

import FilterView from './view/filter-view.js';
///import SortingView from './view/sorting-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointModel from './model/point-model.js';
///import FormView from './view/creation-form-view.js';
///import EditFormView from './view/edit-form-view.js';
///import PointOfRouteView from './view/point-of-route-view.js';


const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteSortingElement = document.querySelector('.trip-events');
const pointModel = new PointModel();
const boardPresenter = new BoardPresenter(siteSortingElement, pointModel);
///const siteAddFormElement = document.querySelector('.trip-events');
///const siteEditFormElement = document.querySelector('.trip-events');
///const sitePointOfRouteElement = document.querySelector('.trip-events');

render(new FilterView(), siteFilterElement);
//render(new SortingView(), siteSortingElement);
///render(new FormView(), siteAddFormElement);
///render(new EditFormView(), siteEditFormElement);
///render(new PointOfRouteView(), sitePointOfRouteElement);
boardPresenter.init();
