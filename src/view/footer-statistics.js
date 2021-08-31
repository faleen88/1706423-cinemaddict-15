import AbstractView from './abstract.js';

const createStatisticsTemplate = (quantity) => `<p>${quantity} movies inside</p>`;

export default class Statistics extends AbstractView {
  constructor(quantity) {
    super();

    this._quantity = quantity;
  }

  getTemplate() {
    return createStatisticsTemplate(this._quantity);
  }
}
