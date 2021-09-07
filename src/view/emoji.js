import AbstractView from './abstract.js';

const createEmojiTemplate = (icon) => `<img src="./images/emoji/${icon}.png" width="55" height="55" alt="emoji">`;

export default class Emoji extends AbstractView {
  constructor(icon) {
    super();

    this._icon = icon;
  }

  getTemplate() {
    return createEmojiTemplate(this._icon);
  }
}
