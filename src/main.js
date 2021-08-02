import {createUserRankTemplate} from './view/user-rank.js';
import {createNavigationTemplate} from './view/navigation.js';
import {createSortTemplate} from './view/sort.js';
import {createCardTemplate} from './view/card-film.js';
import {createCardsListsTemplate} from './view/cards-lists';
import {createShowMoreButtonTemplate} from './view/show-more.js';
import {createPopupTemplate} from './view/popup.js';

const CARD_COUNT = 5;
const CARD_COUNT_EXTRA = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteBody = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

render(siteHeaderElement, createUserRankTemplate(), 'beforeend');
render(siteMainElement, createNavigationTemplate(), 'beforeend');
render(siteMainElement, createSortTemplate(), 'beforeend');
render(siteMainElement, createCardsListsTemplate(), 'beforeend');

const filmsList = siteMainElement.querySelector('.films-list');
const filmsListContainer = siteMainElement.querySelector('.films-list__container');
const filmsListsExtra = siteMainElement.querySelectorAll('.films-list--extra');

for (let i = 0; i < CARD_COUNT; i++) {
  render(filmsListContainer, createCardTemplate(), 'beforeend');
}

filmsListsExtra.forEach((list) => {
  const filmsListContainerExtra = list.querySelector('.films-list__container');
  for (let i = 0; i < CARD_COUNT_EXTRA; i++) {
    render(filmsListContainerExtra, createCardTemplate(), 'beforeend');
  }
});

render(filmsList, createShowMoreButtonTemplate(), 'beforeend');
render(siteBody, createPopupTemplate(), 'beforeend');
