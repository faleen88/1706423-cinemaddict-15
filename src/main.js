import UserRankView from './view/user-rank.js';
import NavigationView from './view/navigation.js';
import {generateCard} from './mock/card.js';
import {generateFilter} from './mock/filter.js';
import {render} from './utils/render.js';
import MovieListPresenter from './presenter/movie-list.js';
import StatisticsView from './view/footer-statistics.js';

const CARD_COUNT = 15;

const films = new Array(CARD_COUNT).fill().map(generateCard);
const filters = generateFilter(films);

const siteBody = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const footerStatistics = document.querySelector('.footer__statistics');

const movieListPresenter = new MovieListPresenter(siteMainElement, siteBody);

render(siteHeaderElement, new UserRankView());
render(siteMainElement, new NavigationView(filters));

movieListPresenter.init(films);

render(footerStatistics, new StatisticsView(CARD_COUNT));
