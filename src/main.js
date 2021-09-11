import UserRankView from './view/user-rank.js';
import FilterPresenter from './presenter/filter.js';
import {generateCard} from './mock/card.js';
import {render} from './utils/render.js';
import MovieListPresenter from './presenter/movie-list.js';
import StatisticsView from './view/footer-statistics.js';
import MoviesModel from './model/movies.js';
import CommentsModel from './model/comments.js';
import {generateCommentsList} from './mock/comment.js';
import FilterModel from './model/filter.js';

const CARD_COUNT = 15;

const films = new Array(CARD_COUNT).fill().map(generateCard);
const comments = generateCommentsList();

const moviesModel = new MoviesModel();
moviesModel.setMovies(films);

const commentsModel = new CommentsModel();
commentsModel.setMovies(comments);

const filterModel = new FilterModel();

const siteBody = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const footerStatistics = document.querySelector('.footer__statistics');

const movieListPresenter = new MovieListPresenter(siteMainElement, siteBody, moviesModel, commentsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, moviesModel);

render(siteHeaderElement, new UserRankView());

filterPresenter.init();
movieListPresenter.init();

render(footerStatistics, new StatisticsView(CARD_COUNT));
