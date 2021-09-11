import AbstractView from './abstract.js';
import {FilterType} from '../const.js';

const NoCardsTextType = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no movies to watch now',
  [FilterType.HISTORY]: 'There are no watched movies now',
  [FilterType.FAVORITES]: 'There are no favorite movies now',
};

const createNoCardTemplate = (filterType) => {
  const noCardTextValue = NoCardsTextType[filterType];

  return `<h2 class="films-list__title">${noCardTextValue}</h2>`;
};

export default class NoCard extends AbstractView {
  constructor(data) {
    super();

    this._data = data;
  }

  getTemplate() {
    return createNoCardTemplate(this._data);
  }
}
