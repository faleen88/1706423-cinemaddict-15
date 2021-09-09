import CardsListsView from '../view/cards-lists';
import CardsListView from '../view/cards-list';
import FilmsContainerView from '../view/films-container.js';
import ShowMoreButtonView from '../view/show-more.js';
import NoCardView from '../view/no-card.js';
import SortView from '../view/sort.js';
import {SortType} from '../const';
import {render, remove} from '../utils/render.js';
import MoviePresenter from './movie.js';
import dayjs from 'dayjs';

const CARD_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(movieListContainer, siteContainer, moviesModel) {
    this._moviesModel = moviesModel;
    this._movieListContainer = movieListContainer;
    this._renderedCardCount = CARD_COUNT_PER_STEP;
    this._siteContainer = siteContainer;
    this._moviePresenter = new Map();
    this._currentSortType = SortType.DEFAULT;

    this._cardsListsComponent = new CardsListsView();
    this._cardsListComponent = new CardsListView();
    this._filmsContainerComponent = new FilmsContainerView();
    this._noCardComponent = new NoCardView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._sortComponent = new SortView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._tasksModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderSort();

    render(this._movieListContainer, this._cardsListsComponent);
    render(this._cardsListsComponent, this._cardsListComponent);
    render(this._cardsListComponent, this._filmsContainerComponent);

    this._renderMovieList();
  }

  _getMovies() {
    switch (this._currentSortType) {
      case SortType.DATE:
        return this._moviesModel.getMovies().slice().sort((cardA, cardB) => dayjs(cardB.releaseDate).diff(dayjs(cardA.releaseDate)));
      case SortType.RATING:
        return this._moviesModel.getMovies().slice().sort((cardA, cardB) => cardB.rating - cardA.rating);
    }

    return this._moviesModel.getMovies();
  }

  _handleModeChange() {
    this._moviePresenter.forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  }

  _handleModelEvent(updateType, data) {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearCardList();
    this._renderCardList();
  }

  _renderSort() {
    render(this._movieListContainer, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderCard(card) {
    const moviePresenter = new MoviePresenter(this._filmsContainerComponent, this._siteContainer, this._handleViewAction, this._handleModeChange);
    moviePresenter.init(card);
    this._moviePresenter.set(card.id, moviePresenter);
  }

  _renderCards(cards) {
    cards.forEach((card) => this._renderCard(card));
  }

  _renderNoCards() {
    render(this._cardsListComponent, this._noCardComponent);
  }

  _handleShowMoreButtonClick() {
    const cardCount = this._getMovies().length;
    const newRenderedCardCount = Math.min(cardCount, this._renderedCardCount + CARD_COUNT_PER_STEP);
    const cards = this._getMovies().slice(this._renderedCardCount, newRenderedCardCount);

    this._renderCards(cards);
    this._renderedCardCount = newRenderedCardCount;

    if (this._renderedCardCount >= cardCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._cardsListComponent, this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _clearCardList() {
    this._moviePresenter.forEach((presenter) => presenter.destroy());
    this._moviePresenter.clear();
    this._renderedCardCount = CARD_COUNT_PER_STEP;
    remove(this._showMoreButtonComponent);
  }

  _renderCardList() {
    const taskCount = this._getMovies().length;
    const cards = this._getMovies().slice(0, Math.min(taskCount, CARD_COUNT_PER_STEP));

    this._renderCards(cards);

    if (taskCount > CARD_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderMovieList() {
    if (this._getMovies().length === 0) {
      this._renderNoCards();
      return;
    }

    this._renderCardList();
  }
}
