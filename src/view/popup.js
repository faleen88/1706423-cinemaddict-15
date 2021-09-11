import dayjs from 'dayjs';
import SmartView from './smart.js';
import {generateCommentsList} from '../mock/comment.js';
import EmojiView from './emoji.js';
import {render} from '../utils/render.js';
import he from 'he';

const createCommentItemTemplate = (comment) => {
  const {author, textComment, emoji, date} = comment;

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${emoji}" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${he.encode(textComment)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${dayjs(date).format('YYYY/MM/DD HH:MM')}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const createGenreItemTemplate = (genre) => `<span class="film-details__genre">${genre}</span>`;

const createPopupTemplate = (data) => {
  const {title, originalTitle, posters, description, rating, minAge, director, writers, actors, releaseDate, duration, country, genres, comments, isWatchlist, isHistory, isFavorite, isCommented} = data;

  const commentItemsTemplate = generateCommentsList()
    .filter((comment) => comments.includes(comment.id))
    .map((comment) => createCommentItemTemplate(comment))
    .join('');

  const genretItemsTemplate = genres
    .map((genre) => createGenreItemTemplate(genre))
    .join('');

  const correctValue = (genres.length === 1) ? 'Genre' : 'Genres';

  const watchlistClassName = isWatchlist
    ? 'film-details__control-button--watchlist film-details__control-button--active'
    : 'film-details__control-button--watchlist';

  const historyClassName = isHistory
    ? 'film-details__control-button--watched film-details__control-button--active'
    : 'film-details__control-button--watched';

  const favoriteClassName = isFavorite
    ? 'film-details__control-button--favorite film-details__control-button--active'
    : 'film-details__control-button--favorite';

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${posters}" alt="">

            <p class="film-details__age">${minAge}</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${originalTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${dayjs(releaseDate).format('DD MMMM YYYY')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${duration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${correctValue}</td>
                <td class="film-details__cell">${genretItemsTemplate}</td>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button ${watchlistClassName}" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button ${historyClassName}" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button ${favoriteClassName}" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

          <ul class="film-details__comments-list">
            ${isCommented ? commentItemsTemplate : ''}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label"></div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

export default class Popup extends SmartView {
  constructor(card) {
    super();
    this._data = Popup.parsePopupToData(card);

    this._clickClosePopupHandler = this._clickClosePopupHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._ctrlEnterKeyDownHandler = this._ctrlEnterKeyDownHandler.bind(this);
    this._textCommentTextareaHandler = this._textCommentTextareaHandler.bind(this);
    this._emojiChoiceHandler = this._emojiChoiceHandler.bind(this);
    this._commentDeleteClickHandler = this._commentDeleteClickHandler.bind(this);

    this._setInnerHandlers();
  }

  reset(card) {
    this.updateData(
      Popup.parsePopupToData(card),
    );
  }

  getTemplate() {
    return createPopupTemplate(this._data);
  }

  _clickClosePopupHandler(evt) {
    evt.preventDefault();
    this._callback.clickClosePopup();
  }

  setClickClosePopupHandler(callback) {
    this._callback.clickClosePopup = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._clickClosePopupHandler);
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector('.film-details__control-button--watchlist').addEventListener('click', this._watchlistClickHandler);
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector('.film-details__control-button--watched').addEventListener('click', this._watchedClickHandler);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-details__control-button--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  _textCommentTextareaHandler(evt) {
    evt.preventDefault();
    this.updateData({
      textComment: evt.target.value,
    }, true);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setClickClosePopupHandler(this._callback.clickClosePopup);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _setInnerHandlers() {
    this.getElement().addEventListener('keydown', this._ctrlEnterKeyDownHandler);
    this.getElement().querySelector('.film-details__comment-input').addEventListener('input', this._textCommentTextareaHandler);
    this.getElement().querySelector('.film-details__emoji-list').addEventListener('change', this._emojiChoiceHandler);
  }

  saveScrollPopup() {
    return this.getElement().scrollTop;
  }

  loadScrollPopup(value) {
    this.getElement().scrollTop = value;
  }

  _ctrlEnterKeyDownHandler(evt) {
    if (evt.key === 'Enter' && evt.ctrlKey) {
      evt.preventDefault();

      this._scroll = this.saveScrollPopup();

      this.updateData({
        isCommented: !this._data.isCommented,
      });

      this.loadScrollPopup(this._scroll);
    }
  }

  _emojiChoiceHandler(evt) {
    evt.preventDefault();

    this._scroll = this.saveScrollPopup();

    this.updateData({
      emoji: evt.target.value,
    });

    this._emojiChanged = new EmojiView(evt.target.value);
    render(this.getElement().querySelector('.film-details__add-emoji-label'), this._emojiChanged);
    evt.target.setAttribute('checked', true);

    this.loadScrollPopup(this._scroll);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(Popup.parseDataToPopup(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  _commentDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(Popup.parseDataToPopup(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement()
      .querySelectorAll('.film-details__comment-delete')
      .forEach((button) => button.addEventListener('click', this._commentDeleteClickHandler));
  }

  static parsePopupToData(card) {
    return Object.assign(
      {},
      card,
      {
        isCommented: card.comments.length !== 0,
      },
    );
  }

  static parseDataToPopup(data) {
    data = Object.assign({}, data);

    delete data.isCommented;

    return data;
  }
}
