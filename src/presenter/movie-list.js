import CardsListsView from '../view/cards-lists';
import CardsListView from '../view/cards-list';
import FilmsContainerView from '../view/films-container.js';
import ShowMoreButtonView from '../view/show-more.js';
import NoCardView from '../view/no-card.js';
import SortView, {SortType} from '../view/sort.js';
import {render, remove} from '../utils/render.js';
import {updateItem} from '../utils/common.js';
import MoviePresenter from './movie.js';
import dayjs from 'dayjs';

const CARD_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(movieListContainer, siteContainer) {
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

    this._handleCardChange = this._handleCardChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(cardsList) {
    this._cardsList = cardsList.slice();
    this._sourcedCardsList = cardsList.slice();

    this._renderSort();

    render(this._movieListContainer, this._cardsListsComponent);
    render(this._cardsListsComponent, this._cardsListComponent);
    render(this._cardsListComponent, this._filmsContainerComponent);

    this._renderMovieList();
  }

  _handleModeChange() {
    this._moviePresenter.forEach((presenter) => presenter.resetView());
  }

  _handleCardChange(updatedCard) {
    this._cardsList = updateItem(this._cardsList, updatedCard);
    this._sourcedCardsList = updateItem(this._sourcedCardsList, updatedCard);
    this._moviePresenter.get(updatedCard.id).init(updatedCard);
  }

  _sortCards(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._cardsList.sort((cardA, cardB) => dayjs(cardB.releaseDate).diff(dayjs(cardA.releaseDate)));
        break;
      case SortType.RATING:
        this._cardsList.sort((cardA, cardB) => cardB.rating - cardA.rating);
        break;
      default:
        this._cardsList = this._sourcedCardsList.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortCards(sortType);
    this._clearCardList();
    this._renderCardList();
  }

  _renderSort() {
    render(this._movieListContainer, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderCard(card) {
    const moviePresenter = new MoviePresenter(this._filmsContainerComponent, this._siteContainer, this._handleCardChange, this._handleModeChange);
    moviePresenter.init(card);
    this._moviePresenter.set(card.id, moviePresenter);
  }

  _renderCards(from, to) {
    this._cardsList
      .slice(from, to)
      .forEach((card) => this._renderCard(card));
  }

  _renderNoCards() {
    render(this._cardsListComponent, this._noCardComponent);
  }

  _handleShowMoreButtonClick() {
    this._renderCards(this._renderedCardCount, this._renderedCardCount + CARD_COUNT_PER_STEP);
    this._renderedCardCount += CARD_COUNT_PER_STEP;

    if (this._renderedCardCount >= this._cardsList.length) {
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
    this._renderCards(0, Math.min(this._cardsList.length, CARD_COUNT_PER_STEP));

    if (this._cardsList.length > CARD_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderMovieList() {
    if (this._cardsList.length === 0) {
      this._renderNoCards();
      return;
    }

    this._renderCardList();
  }
}
