import dayjs from 'dayjs';
import {getRandomInteger} from '../utils.js';

const generateAuthor = () => {
  const authors = [
    'John Doe',
    'Tim Macoveev',
  ];

  const randomIndex = getRandomInteger(0, authors.length - 1);

  return authors[randomIndex];
};

const generateText = () => {
  const texts = [
    'Interesting setting and a good cast',
    'Booooooooooring',
    'Very very old. Meh',
    'Almost two hours? Seriously?',
  ];

  const randomIndex = getRandomInteger(0, texts.length - 1);

  return texts[randomIndex];
};

const generateEmoji = () => {
  const emoji = [
    'angry.png',
    'puke.png',
    'sleeping.png',
    'smile.png',
  ];

  const randomIndex = getRandomInteger(0, emoji.length - 1);

  return emoji[randomIndex];
};

export const generateDate = (minDaysGap, maxDaysGap) => {
  const daysGap = getRandomInteger(minDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'day').toDate();
};

export const generateComment = () => ({
  author: generateAuthor(),
  text: generateText(),
  emoji: `images/emoji/${generateEmoji()}`,
  date: generateDate(-7, 0),
});
