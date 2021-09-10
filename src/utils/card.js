import dayjs from 'dayjs';

export const sortCardReleaseDate = (cardA, cardB) => dayjs(cardB.releaseDate).diff(dayjs(cardA.releaseDate));

export const sortCardRating = (cardA, cardB) => cardB.rating - cardA.rating;
