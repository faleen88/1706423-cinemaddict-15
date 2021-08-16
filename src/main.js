import UserRankView from './view/user-rank.js';
import NavigationView from './view/navigation.js';
import SortView from './view/sort.js';
import CardView from './view/card-film.js';
import CardsListsView from './view/cards-lists';
import ShowMoreButtonView from './view/show-more.js';
import PopupView from './view/popup.js';
import {generateCard} from './mock/card.js';
import {generateFilter} from './mock/filter.js';
import {renderTemplate} from './utils.js';

const CARD_COUNT = 15;
const CARD_COUNT_PER_STEP = 5;
const CARD_COUNT_EXTRA = 2;

const films = new Array(CARD_COUNT).fill().map(generateCard);
const filters = generateFilter(films);

const siteBody = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

renderTemplate(siteHeaderElement, new UserRankView().getElement());
renderTemplate(siteMainElement, new NavigationView(filters).getElement());
renderTemplate(siteMainElement, new SortView().getElement());
renderTemplate(siteMainElement, new CardsListsView().getElement());

const filmsList = siteMainElement.querySelector('.films-list');
const filmsListContainer = siteMainElement.querySelector('.films-list__container');
const filmsListsExtra = siteMainElement.querySelectorAll('.films-list--extra');

for (let i = 0; i < Math.min(films.length, CARD_COUNT_PER_STEP); i++) {
  renderTemplate(filmsListContainer, new CardView(films[i]).getElement());
}

filmsListsExtra.forEach((list) => {
  const filmsListContainerExtra = list.querySelector('.films-list__container');
  for (let i = 0; i < CARD_COUNT_EXTRA; i++) {
    renderTemplate(filmsListContainerExtra, new CardView(films[i]).getElement());
  }
});

if (films.length > CARD_COUNT_PER_STEP) {
  let renderedCardCount = CARD_COUNT_PER_STEP;

  renderTemplate(filmsList, new ShowMoreButtonView().getElement());

  const showMoreButton = filmsList.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedCardCount, renderedCardCount + CARD_COUNT_PER_STEP)
      .forEach((film) => renderTemplate(filmsListContainer, new CardView(film).getElement()));

    renderedCardCount += CARD_COUNT_PER_STEP;

    if (renderedCardCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

renderTemplate(siteBody, new PopupView(films[0]).getElement());
