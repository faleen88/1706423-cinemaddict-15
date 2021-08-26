import UserRankView from './view/user-rank.js';
import NavigationView from './view/navigation.js';
import SortView from './view/sort.js';
import {generateCard} from './mock/card.js';
import {generateFilter} from './mock/filter.js';
import {render} from './utils/render.js';
import MovieListPresenter from './presenter/movie-list.js';

const CARD_COUNT = 15;
//const CARD_COUNT_EXTRA = 2;

const films = new Array(CARD_COUNT).fill().map(generateCard);
const filters = generateFilter(films);

const siteBody = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
/*
filmsListsExtra.forEach((list) => {
  const filmsListContainerExtra = list.querySelector('.films-list__container');
  for (let i = 0; i < CARD_COUNT_EXTRA; i++) {
    renderCardFilm(filmsListContainerExtra, cardsList[i]);
  }
});
*/
const movieListPresenter = new MovieListPresenter(siteMainElement, siteBody);

render(siteHeaderElement, new UserRankView());
render(siteMainElement, new NavigationView(filters));
render(siteMainElement, new SortView());

movieListPresenter.init(films);
