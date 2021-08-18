const filterCards = (list) => {
  const watchlistFilms = [];
  const watchedFilms = [];
  const favoriteFilms = [];

  list.forEach((item) => {
    if (item.isWatchlist) {
      watchlistFilms.push(item);
    }
    if (item.isHistory) {
      watchedFilms.push(item);
    }
    if (item.isFavorite) {
      favoriteFilms.push(item);
    }
  });

  return {
    watchlist: watchlistFilms.length,
    history: watchedFilms.length,
    favorites: favoriteFilms.length,
  };
};

export const generateFilter = (films) => Object.entries(filterCards(films)).map(
  ([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms,
  }),
);
