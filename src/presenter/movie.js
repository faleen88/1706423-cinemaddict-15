import CardView from '../view/card-film.js';
import PopupView from '../view/popup.js';
import {render, remove, replace} from '../utils/render.js';

export default class Movie {
  constructor(filmListContainer, siteContainer) {
    this._filmListContainer = filmListContainer;
    this._siteContainer = siteContainer;

    this._cardComponent = null;
    this._popupComponent = null;

    this._handleClickOpenPopup = this._handleClickOpenPopup.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleClickClosePopup = this._handleClickClosePopup.bind(this);
  }

  init(card) {
    this.card = card;

    const prevCardComponent = this._cardComponent;
    const prevPopupComponent = this._popupComponent;

    this._cardComponent = new CardView(card);
    this._popupComponent = new PopupView(card);

    this._cardComponent.setCardClickHandler(this._handleClickOpenPopup);

    if (prevCardComponent === null || prevPopupComponent === null) {
      render(this._filmListContainer, this._cardComponent);
      return;
    }

    if (this._filmListContainer.getElement().contains(prevCardComponent.getElement())) {
      replace(this._cardComponent, prevCardComponent);
    }

    if (this._siteContainer.contains(prevPopupComponent.getElement())) {
      replace(this._popupComponent, prevPopupComponent);
    }

    remove(prevCardComponent);
    remove(prevPopupComponent);
  }

  destroy() {
    remove(this._cardComponent);
    remove(this._popupComponent);
  }

  _handleClickOpenPopup() {
    this._siteContainer.appendChild(this._popupComponent.getElement());
    this._siteContainer.classList.add('hide-overflow');
    this._popupComponent.setClickClosePopupHandler(this._handleClickClosePopup);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _closePopup() {
    this._siteContainer.removeChild(this._popupComponent.getElement());
    this._siteContainer.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._closePopup();
    }
  }

  _handleClickClosePopup() {
    this._closePopup();
  }
}
