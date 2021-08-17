import UserRankView from './view/user-rank.js';
import NavigationView from './view/navigation.js';
import SortView from './view/sort.js';
import CardView from './view/card-film.js';
import CardsListsView from './view/cards-lists';
import ShowMoreButtonView from './view/show-more.js';
import PopupView from './view/popup.js';
import {generateCard} from './mock/card.js';
import {generateFilter} from './mock/filter.js';
import {render} from './utils.js';

const CARD_COUNT = 15;
const CARD_COUNT_PER_STEP = 5;
const CARD_COUNT_EXTRA = 2;

const films = new Array(CARD_COUNT).fill().map(generateCard);
const filters = generateFilter(films);

const siteBody = document.querySelector('body');

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

const renderCardFilm = (cardListElement, card) => {
  const cardComponent = new CardView(card);
  const popupComponent = new PopupView(card);

  render(cardListElement, cardComponent.getElement());

  const closePopup = () => {
    siteBody.removeChild(popupComponent.getElement());
    siteBody.classList.remove('hide-overflow');
    popupComponent.getElement().querySelector('.film-details__close-btn').removeEventListener('click', onClickClosePopup); // eslint-disable-line no-use-before-define
    document.removeEventListener('keydown', onEscKeyDownClosePopap); // eslint-disable-line no-use-before-define
  };

  const onClickClosePopup = () => {
    closePopup();
  };

  const onEscKeyDownClosePopap = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      closePopup();
    }
  };

  const onClickOpenPopap = () => {
    siteBody.appendChild(popupComponent.getElement());
    siteBody.classList.add('hide-overflow');
    popupComponent.getElement().querySelector('.film-details__close-btn').addEventListener('click', onClickClosePopup);
    document.addEventListener('keydown', onEscKeyDownClosePopap);
  };

  cardComponent.getElement().querySelector('.film-card__poster').addEventListener('click', onClickOpenPopap);
  cardComponent.getElement().querySelector('.film-card__title').addEventListener('click', onClickOpenPopap);
  cardComponent.getElement().querySelector('.film-card__comments').addEventListener('click', onClickOpenPopap);
};

render(siteHeaderElement, new UserRankView().getElement());
render(siteMainElement, new NavigationView(filters).getElement());
render(siteMainElement, new SortView().getElement());
render(siteMainElement, new CardsListsView().getElement());

const filmsList = siteMainElement.querySelector('.films-list');
const filmsListContainer = siteMainElement.querySelector('.films-list__container');
const filmsListsExtra = siteMainElement.querySelectorAll('.films-list--extra');

for (let i = 0; i < Math.min(films.length, CARD_COUNT_PER_STEP); i++) {
  renderCardFilm(filmsListContainer, films[i]);
}

filmsListsExtra.forEach((list) => {
  const filmsListContainerExtra = list.querySelector('.films-list__container');
  for (let i = 0; i < CARD_COUNT_EXTRA; i++) {
    renderCardFilm(filmsListContainerExtra, films[i]);
  }
});

if (films.length > CARD_COUNT_PER_STEP) {
  let renderedCardCount = CARD_COUNT_PER_STEP;

  render(filmsList, new ShowMoreButtonView().getElement());

  const showMoreButton = filmsList.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedCardCount, renderedCardCount + CARD_COUNT_PER_STEP)
      .forEach((film) => renderCardFilm(filmsListContainer, film));

    renderedCardCount += CARD_COUNT_PER_STEP;

    if (renderedCardCount >= films.length) {
      showMoreButton.remove();
    }
  });
}
