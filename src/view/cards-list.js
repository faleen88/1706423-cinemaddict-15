import AbstractView from './abstract.js';

const createCardsListTemplate = () => (
  `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>`
);

export default class CardsList extends AbstractView {
  getTemplate() {
    return createCardsListTemplate();
  }
}
