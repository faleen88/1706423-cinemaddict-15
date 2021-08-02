import {createNavigationTemplate} from './view/navigation.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.main');

render(siteMainElement, createNavigationTemplate(), 'beforeend');
