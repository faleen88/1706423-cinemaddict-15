import {getRandomInteger, getRandomPositiveFloat} from './util.js';
import {generateComment} from './comment.js';

const generateTitle = () => {
  const titles = [
    'The Dance of Life',
    'Sagebrush Trail',
    'The Man with the Golden Arm',
    'Santa Claus Conquers the Martians',
    'Popeye the Sailor Meets Sindbad the Sailor',
  ];

  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

const generatePosters = () => {
  const posters = [
    'the-dance-of-life.jpg',
    'sagebrush-trail.jpg',
    'the-man-with-the-golden-arm.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'popeye-meets-sinbad.png',
  ];

  const randomIndex = getRandomInteger(0, posters.length - 1);

  return posters[randomIndex];
};

const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
  ];

  const filmDescription = new Array(getRandomInteger(1, 5))
    .fill()
    .map(() => descriptions[getRandomInteger(0, descriptions.length - 1)]);

  return filmDescription;
};

const generateGenre = () => {
  const genres = [
    'Musical',
    'Western',
    'Drama',
    'Comedy',
    'Cartoon',
  ];

  const randomIndex = getRandomInteger(0, genres.length - 1);

  return genres[randomIndex];
};

export const generateCard = () => ({
  title: generateTitle(),
  posters: `./images/posters/${generatePosters()}`,
  description: generateDescription().join(' '),
  rating: getRandomPositiveFloat(0, 10),
  productionYear: getRandomInteger(1900, 2000),
  duration: `${getRandomInteger(1, 2)}h ${getRandomInteger(0, 59)}m`,
  genre: generateGenre(),
  comments: new Array(getRandomInteger(0, 5)).fill().map(generateComment),
  isWatchlist: Boolean(getRandomInteger(0, 1)),
  isHistory: Boolean(getRandomInteger(0, 1)),
  isFavorite: Boolean(getRandomInteger(0, 1)),
});
