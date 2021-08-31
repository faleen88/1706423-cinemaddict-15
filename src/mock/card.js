import {getRandomInteger, getRandomPositiveFloat} from '../utils/common.js';
import {generateDate, commentsList} from './comment.js';
import {nanoid} from 'nanoid';

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

const generatezMinAge = () => {
  const ageLimit = getRandomInteger(0, 18);

  return (ageLimit === 0) ? ageLimit : `${ageLimit}+`;
};

const generateGenre = () => {
  const genres = [
    'Musical',
    'Western',
    'Drama',
    'Comedy',
    'Cartoon',
    'Film-Noir',
    'Mystery',
    'Detective',
    'Horror',
  ];

  const randomIndex = getRandomInteger(0, genres.length - 1);

  return genres[randomIndex];
};

const generatePerson = () => {
  const persons = [
    'Anthony Mann',
    'Anne Wigton',
    'Heinz Herald',
    'Richard Weil',
    'Erich von Stroheim',
    'Mary Beth Hughes',
    'Dan Duryea',
  ];

  const randomIndex = getRandomInteger(0, persons.length - 1);

  return persons[randomIndex];
};

const generateCountry = () => {
  const countries = [
    'USA',
    'Russia',
    'France',
    'Germany',
    'Japan',
    'China',
  ];

  const randomIndex = getRandomInteger(0, countries.length - 1);

  return countries[randomIndex];
};

const generateDuration = () => {
  const randomDuration = getRandomInteger(1, 180);

  if (randomDuration > 59) {
    const hour = Math.trunc(randomDuration / 60);
    const minute = randomDuration % 60;
    return `${hour}h ${minute}m`;
  } else {
    return `${randomDuration}m`;
  }
};

const createIdList = (comments) => {
  const idList = [];
  let id = 0;
  while(idList.length < getRandomInteger(0, 5)){
    const randomIndex = getRandomInteger(0, comments.length - 1);
    id = comments[randomIndex].id;
    if (idList.indexOf(id) === -1) {
      idList.push(id);
    }
  }
  return idList;
};

export const generateCard = () => ({
  id: nanoid(),
  title: generateTitle(),
  originalTitle: generateTitle(),
  posters: `images/posters/${generatePosters()}`,
  description: generateDescription().join(' '),
  rating: getRandomPositiveFloat(0, 10),
  minAge: generatezMinAge(),
  director: generatePerson(),
  writers: new Array(getRandomInteger(2, 3)).fill().map(generatePerson),
  actors: new Array(getRandomInteger(2, 3)).fill().map(generatePerson),
  releaseDate: generateDate(-36500, -7300),
  duration:generateDuration(),
  country: generateCountry(),
  genres: new Array(getRandomInteger(1, 3)).fill().map(generateGenre),
  comments: createIdList(commentsList),
  isWatchlist: Boolean(getRandomInteger(0, 1)),
  isHistory: Boolean(getRandomInteger(0, 1)),
  isFavorite: Boolean(getRandomInteger(0, 1)),
});
