import CardView from '../view/card-film.js';
import PopupView from '../view/popup.js';
import {render, remove, replace} from '../utils/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};

export default class Movie {
  constructor(filmListContainer, siteContainer, changeData, changeMode) {
    this._filmListContainer = filmListContainer;
    this._siteContainer = siteContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._cardComponent = null;
    this._popupComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleClickOpenPopup = this._handleClickOpenPopup.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleClickClosePopup = this._handleClickClosePopup.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(card) {
    this._card = card;

    const prevCardComponent = this._cardComponent;
    const prevPopupComponent = this._popupComponent;

    this._cardComponent = new CardView(card);
    this._popupComponent = new PopupView(card);

    this._cardComponent.setCardClickHandler(this._handleClickOpenPopup);
    this._cardComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._cardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._cardComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    this._popupComponent.setClickClosePopupHandler(this._handleClickClosePopup);
    this._popupComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._popupComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._popupComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevCardComponent === null || prevPopupComponent === null) {
      render(this._filmListContainer, this._cardComponent);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._cardComponent, prevCardComponent);
    }

    if (this._mode === Mode.POPUP) {
      replace(this._popupComponent, prevPopupComponent);
    }

    remove(prevCardComponent);
    remove(prevPopupComponent);
  }

  destroy() {
    remove(this._cardComponent);
    remove(this._popupComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopup();
    }
  }

  _handleClickOpenPopup() {
    this._siteContainer.appendChild(this._popupComponent.getElement());
    this._siteContainer.classList.add('hide-overflow');
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.POPUP;
  }

  _closePopup() {
    this._popupComponent.reset(this._card);
    this._siteContainer.removeChild(this._popupComponent.getElement());
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._closePopup();
    }
  }

  _handleClickClosePopup() {
    this._closePopup();
    this._siteContainer.classList.remove('hide-overflow');
  }

  _handleWatchlistClick() {
    this._changeData(
      Object.assign(
        {},
        this._card,
        {
          isWatchlist: !this._card.isWatchlist,
        },
      ),
    );
  }

  _handleWatchedClick() {
    this._changeData(
      Object.assign(
        {},
        this._card,
        {
          isHistory: !this._card.isHistory,
        },
      ),
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._card,
        {
          isFavorite: !this._card.isFavorite,
        },
      ),
    );
  }
}
