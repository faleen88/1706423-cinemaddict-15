import UserRankView from './view/user-rank.js';
import NavigationView from './view/navigation.js';
import {generateCard} from './mock/card.js';
import {generateFilter} from './mock/filter.js';
import {render} from './utils/render.js';
import MovieListPresenter from './presenter/movie-list.js';
import StatisticsView from './view/footer-statistics.js';
import MoviesModel from './model/movies.js';
import CommentsModel from './model/comments.js';
import {generateCommentsList} from './mock/comment.js';

const CARD_COUNT = 15;

const films = new Array(CARD_COUNT).fill().map(generateCard);
const filters = generateFilter(films);
const comments = generateCommentsList();

const moviesModel = new MoviesModel();
moviesModel.setMovies(films);

const commentsModel = new CommentsModel();
commentsModel.setMovies(comments);

const siteBody = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const footerStatistics = document.querySelector('.footer__statistics');

const movieListPresenter = new MovieListPresenter(siteMainElement, siteBody, moviesModel, commentsModel);

render(siteHeaderElement, new UserRankView());
render(siteMainElement, new NavigationView(filters));

movieListPresenter.init();

render(footerStatistics, new StatisticsView(CARD_COUNT));
