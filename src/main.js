import {createUserRankTemplate} from './view/user-rank.js';
import {createNavigationTemplate} from './view/navigation.js';
import {createSortTemplate} from './view/sort.js';
import {createCardTemplate} from './view/card-film.js';
import {createCardsListsTemplate} from './view/cards-lists';
import {createShowMoreButtonTemplate} from './view/show-more.js';
import {createPopupTemplate} from './view/popup.js';
import {generateCard} from './mock/card.js';
import {generateFilter} from './mock/filter.js';
import './mock/comment.js';

const CARD_COUNT = 15;
const CARD_COUNT_PER_STEP = 5;
const CARD_COUNT_EXTRA = 2;

const films = new Array(CARD_COUNT).fill().map(generateCard);
const filters = generateFilter(films);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteBody = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

render(siteHeaderElement, createUserRankTemplate(), 'beforeend');
render(siteMainElement, createNavigationTemplate(filters), 'beforeend');
render(siteMainElement, createSortTemplate(), 'beforeend');
render(siteMainElement, createCardsListsTemplate(), 'beforeend');

const filmsList = siteMainElement.querySelector('.films-list');
const filmsListContainer = siteMainElement.querySelector('.films-list__container');
const filmsListsExtra = siteMainElement.querySelectorAll('.films-list--extra');

for (let i = 0; i < Math.min(films.length, CARD_COUNT_PER_STEP); i++) {
  render(filmsListContainer, createCardTemplate(films[i]), 'beforeend');
}

filmsListsExtra.forEach((list) => {
  const filmsListContainerExtra = list.querySelector('.films-list__container');
  for (let i = 0; i < CARD_COUNT_EXTRA; i++) {
    render(filmsListContainerExtra, createCardTemplate(films[i]), 'beforeend');
  }
});

if (films.length > CARD_COUNT_PER_STEP) {
  let renderedCardCount = CARD_COUNT_PER_STEP;

  render(filmsList, createShowMoreButtonTemplate(), 'beforeend');

  const showMoreButton = filmsList.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedCardCount, renderedCardCount + CARD_COUNT_PER_STEP)
      .forEach((film) => render(filmsListContainer, createCardTemplate(film), 'beforeend'));

    renderedCardCount += CARD_COUNT_PER_STEP;

    if (renderedCardCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

render(siteBody, createPopupTemplate(), 'beforeend');
