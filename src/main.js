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
import NoCardView from './view/no-card.js';

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
    popupComponent.setClickClosePopupHandler(onClickClosePopup);
    document.addEventListener('keydown', onEscKeyDownClosePopap);
  };

  cardComponent.setCardClickHandler(onClickOpenPopap);
};

const renderCardsLists = (cardsListsContainer, cardsList) => {
  const cardsListsComponent = new CardsListsView();
  const noCardComponent = new NoCardView();
  const showMoreButtonComponent = new ShowMoreButtonView();

  render(cardsListsContainer, cardsListsComponent.getElement());

  const filmsList = siteMainElement.querySelector('.films-list');
  const filmsListContainer = siteMainElement.querySelector('.films-list__container');
  const filmsListsExtra = siteMainElement.querySelectorAll('.films-list--extra');

  if (cardsList.length === 0) {
    render(filmsList, noCardComponent.getElement());
  } else {

    for (let i = 0; i < Math.min(cardsList.length, CARD_COUNT_PER_STEP); i++) {
      renderCardFilm(filmsListContainer, cardsList[i]);
    }

    filmsListsExtra.forEach((list) => {
      const filmsListContainerExtra = list.querySelector('.films-list__container');
      for (let i = 0; i < CARD_COUNT_EXTRA; i++) {
        renderCardFilm(filmsListContainerExtra, cardsList[i]);
      }
    });

    if (cardsList.length > CARD_COUNT_PER_STEP) {
      let renderedCardCount = CARD_COUNT_PER_STEP;

      render(filmsList, showMoreButtonComponent.getElement());

      showMoreButtonComponent.setClickHandler(() => {
        cardsList
          .slice(renderedCardCount, renderedCardCount + CARD_COUNT_PER_STEP)
          .forEach((card) => renderCardFilm(filmsListContainer, card));

        renderedCardCount += CARD_COUNT_PER_STEP;

        if (renderedCardCount >= cardsList.length) {
          showMoreButtonComponent.getElement().remove();
          showMoreButtonComponent.removeElement();
        }
      });
    }
  }
};

render(siteHeaderElement, new UserRankView().getElement());
render(siteMainElement, new NavigationView(filters).getElement());
render(siteMainElement, new SortView().getElement());

renderCardsLists(siteMainElement, films);
