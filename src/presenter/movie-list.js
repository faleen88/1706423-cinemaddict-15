import CardsListsView from '../view/cards-lists';
import CardsListView from '../view/cards-list';
import FilmListView from '../view/films-container.js';
import ShowMoreButtonView from '../view/show-more.js';
import NoCardView from '../view/no-card.js';
import {render, remove} from '../utils/render.js';
import {updateItem} from '../utils/common.js';
import MoviePresenter from './movie.js';

const CARD_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(movieListContainer, siteContainer) {
    this._movieListContainer = movieListContainer;
    this._renderedCardCount = CARD_COUNT_PER_STEP;
    this._siteContainer = siteContainer;
    this._moviePresenter = new Map();

    this._cardsListsComponent = new CardsListsView();
    this._cardsListComponent = new CardsListView();
    this._filmListComponent = new FilmListView();
    this._noCardComponent = new NoCardView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleCardChange = this._handleCardChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(cardsList) {
    this._cardsList = cardsList.slice();

    render(this._movieListContainer, this._cardsListsComponent);
    render(this._cardsListsComponent, this._cardsListComponent);
    render(this._cardsListComponent, this._filmListComponent);

    this._renderMovieList();
  }

  _handleCardChange(updatedCard) {
    this._cardsList = updateItem(this._cardsList, updatedCard);
    this._moviePresenter.get(updatedCard.id).init(updatedCard);
  }

  _renderCard(card) {
    const moviePresenter = new MoviePresenter(this._filmListComponent, this._siteContainer, this._handleCardChange);
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
