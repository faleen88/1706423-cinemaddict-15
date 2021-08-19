import dayjs from 'dayjs';
import AbstractView from './abstract.js';

const MAX_QUANTITY_SIGNS = 140;

const createCardTemplate = (card) => {
  const {title, posters, description, rating, releaseDate, duration, genres, comments, isWatchlist, isHistory, isFavorite} = card;

  const descriptionLimit = (description.length > MAX_QUANTITY_SIGNS) ? `${description.substr(0, 139)}...` : `${description}`;

  const watchlistClassName = isWatchlist
    ? 'film-card__controls-item--add-to-watchlist film-card__controls-item--active'
    : 'film-card__controls-item--add-to-watchlist';

  const historyClassName = isHistory
    ? 'film-card__controls-item--mark-as-watched film-card__controls-item--active'
    : 'film-card__controls-item--mark-as-watched';

  const favoriteClassName = isFavorite
    ? 'film-card__controls-item--favorite film-card__controls-item--active'
    : 'film-card__controls-item--favorite';

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${dayjs(releaseDate).format('YYYY')}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genres[0]}</span>
    </p>
    <img src="${posters}" alt="" class="film-card__poster">
    <p class="film-card__description">${descriptionLimit}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item ${watchlistClassName}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item ${historyClassName}" type="button">Mark as watched</button>
      <button class="film-card__controls-item ${favoriteClassName}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class Card extends AbstractView {
  constructor(card) {
    super();
    this._card = card;

    this._cardClickHandler = this._cardClickHandler.bind(this);
  }

  getTemplate() {
    return createCardTemplate(this._card);
  }

  _cardClickHandler(evt) {
    evt.preventDefault();
    this._callback.cardClick();
  }

  setCardClickHandler(callback) {
    this._callback.cardClick = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._cardClickHandler);
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._cardClickHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._cardClickHandler);
  }
}
