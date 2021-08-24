import CardsListsView from '../view/cards-lists';
import CardsListView from '../view/cards-list';
import FilmListView from '../view/films-container.js';
import ShowMoreButtonView from '../view/show-more.js';
import NoCardView from '../view/no-card.js';
import CardView from '../view/card-film.js';
import PopupView from '../view/popup.js';
import {render, remove} from '../utils/render.js';

const CARD_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;

    this._cardsListsComponent = new CardsListsView();
    this._cardsListComponent = new CardsListView();
    this._filmListComponent = new FilmListView();
    this._noCardComponent = new NoCardView();
    this._showMoreButtoComponent = new ShowMoreButtonView();
  }

  init(cardsList) {
    this._cardsList = cardsList.slice();

    render(this._movieListContainer, this._cardsListsComponent);
    render(this._cardsListsComponent, this._cardsListComponent);
    render(this._cardsListComponent, this._filmListComponent);

    this._renderMovieList();
  }

  _renderCard(card) {
    this._cardComponent = new CardView(card);
    this._popupComponent = new PopupView(card);

    render(this._filmListComponent, this._cardComponent);
  /*
    const closePopup = () => {
      siteBody.removeChild(this._popupComponent.getElement());
      siteBody.classList.remove('hide-overflow');
      document.removeEventListener('keydown', onEscKeyDownClosePopup); // eslint-disable-line no-use-before-define
    };

    const onClickClosePopup = () => {
      closePopup();
    };

    const onEscKeyDownClosePopup = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closePopup();
      }
    };

    const onClickOpenPopup = () => {
      siteBody.appendChild(this._popupComponent.getElement());
      siteBody.classList.add('hide-overflow');
      this._popupComponent.setClickClosePopupHandler(onClickClosePopup);
      document.addEventListener('keydown', onEscKeyDownClosePopup);
    };

    this._cardComponent.setCardClickHandler(onClickOpenPopup);
    */
  }

  _renderCards(from, to) {
    this._cardsList
      .slice(from, to)
      .forEach((card) => this._renderCard(card));
  }

  _renderNoCards() {
    render(this._cardsListComponent, this._noCardComponent);
  }

  _renderShowMoreButton() {
    let renderedCardCount = CARD_COUNT_PER_STEP;

    const showMoreButtonComponent = new ShowMoreButtonView();

    render(this._cardsListComponent, showMoreButtonComponent);

    showMoreButtonComponent.setClickHandler(() => {
      this._cardsList
        .slice(renderedCardCount, renderedCardCount + CARD_COUNT_PER_STEP)
        .forEach((card) => this._renderCard(card));

      renderedCardCount += CARD_COUNT_PER_STEP;

      if (renderedCardCount >= this._cardsList.length) {
        remove(showMoreButtonComponent);
      }
    });
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
