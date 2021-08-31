import AbstractView from './abstract.js';

const createCardsListsTemplate = () => '<section class="films"></section>';

export default class CardsLists extends AbstractView {
  getTemplate() {
    return createCardsListsTemplate();
  }
}
