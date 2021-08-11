const taskToFilterMap = {
  watchlist: (films) => films.filter((film) => film.isWatchlist).length,
  history: (films) => films.filter((film) => film.isHistory).length,
  favorites: (films) => films.filter((film) => film.isFavorite).length,
};

export const generateFilter = (films) => Object.entries(taskToFilterMap).map(
  ([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms(films),
  }),
);
