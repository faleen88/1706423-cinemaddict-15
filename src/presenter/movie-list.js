import CardsListsView from '../view/cards-lists';
import CardsListView from '../view/cards-list';
import FilmsContainerView from '../view/films-container.js';
import ShowMoreButtonView from '../view/show-more.js';
import NoCardView from '../view/no-card.js';
import SortView from '../view/sort.js';
import {SortType, UpdateType, UserAction} from '../const';
import {render, remove} from '../utils/render.js';
import MoviePresenter from './movie.js';
import {sortCardReleaseDate, sortCardRating} from '../utils/card.js';

const CARD_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(movieListContainer, siteContainer, moviesModel, commentsModel) {
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;
    this._movieListContainer = movieListContainer;
    this._renderedCardCount = CARD_COUNT_PER_STEP;
    this._siteContainer = siteContainer;
    this._moviePresenter = new Map();
    this._currentSortType = SortType.DEFAULT;

    this._cardsListsComponent = new CardsListsView();
    this._cardsListComponent = new CardsListView();
    this._filmsContainerComponent = new FilmsContainerView();
    this._noCardComponent = new NoCardView();
    this._sortComponent = null;
    this._showMoreButtonComponent = null;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderMovieBoard();
  }

  _getMovies() {
    switch (this._currentSortType) {
      case SortType.DATE:
        return this._moviesModel.getMovies().slice().sort(sortCardReleaseDate);
      case SortType.RATING:
        return this._moviesModel.getMovies().slice().sort(sortCardRating);
    }

    return this._moviesModel.getMovies();
  }

  _handleModeChange() {
    this._moviePresenter.forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_CARD:
        this._moviesModel.updateMovie(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this._commentsModel.addComments(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this._commentsModel.deleteComments(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._moviePresenter.get(data.id).init(data);
        this._moviePresenter.get(data.id).renderPopup();
        break;
      case UpdateType.MINOR:
        this._clearMovieBoard();
        this._renderMovieBoard();
        break;
      case UpdateType.MAJOR:
        this._clearMovieBoard({resetRenderedCardCount: true, resetSortType: true});
        this._renderMovieBoard();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearMovieBoard({resetRenderedCardCount: true});
    this._renderMovieBoard();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._movieListContainer, this._sortComponent);
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
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);

    render(this._cardsListComponent, this._showMoreButtonComponent);
  }

  _clearCardList() {
    this._moviePresenter.forEach((presenter) => presenter.destroy());
    this._moviePresenter.clear();
    this._renderedCardCount = CARD_COUNT_PER_STEP;
    remove(this._showMoreButtonComponent);
  }

  _renderCardList() {
    const cardCount = this._getMovies().length;
    const cards = this._getMovies().slice(0, Math.min(cardCount, CARD_COUNT_PER_STEP));

    this._renderCards(cards);

    if (cardCount > CARD_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderMovieList() {
    const movies = this._getMovies();
    const cardCount = movies.length;

    if (cardCount === 0) {
      this._renderNoCards();
      remove(this._sortComponent);
      return;
    }

    this._renderCards(movies.slice(0, Math.min(cardCount, this._renderedCardCount)));

    if (cardCount > this._renderedCardCount) {
      this._renderShowMoreButton();
    }
  }

  _clearMovieBoard({resetRenderedCardCount = false, resetSortType = false} = {}) {
    const cardCount = this._getMovies().length;

    this._moviePresenter.forEach((presenter) => presenter.destroy());
    this._moviePresenter.clear();

    remove(this._sortComponent);
    remove(this._noCardComponent);
    remove(this._showMoreButtonComponent);

    if (resetRenderedCardCount) {
      this._renderedCardCount = CARD_COUNT_PER_STEP;
    } else {
      this._renderedCardCount = Math.min(cardCount, this._renderedCardCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }

  }

  _renderMovieBoard() {
    this._renderSort();

    render(this._movieListContainer, this._cardsListsComponent);
    render(this._cardsListsComponent, this._cardsListComponent);
    render(this._cardsListComponent, this._filmsContainerComponent);

    this._renderMovieList();
  }
}
