import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({
  movies,
  moviesFilteredByName,
  moviesFilteredByCheckbox,
  handleSearchMovies,
  handleCheckbox,
  movie,
  checkbox,
  isPreloaderActive,
  isGetError,
  saveMovie,
  deleteMovie,
  savedMovies
}) {

  const [isFirstLoad, setIsFirstLoad] = React.useState(false);

  React.useEffect (() => {
    setIsFirstLoad(true);
  }, [])

  const handleLoad = (value) => {
    setIsFirstLoad(value);
  };

  return (
    <section className="movies">
        <SearchForm
          isSavedMovies={false}
          movies={movies}
          moviesFilteredByName={moviesFilteredByName}
          handleSearchMovies={handleSearchMovies}
          handleCheckbox={handleCheckbox}
          movie={movie}
          checkbox ={checkbox}
          handleLoad={handleLoad}
        />
        <MoviesCardList
          isSavedMovies={false}
          moviesFilteredByCheckbox={moviesFilteredByCheckbox}
          isPreloaderActive={isPreloaderActive}
          isGetError={isGetError}
          isFirstLoad={isFirstLoad}
          saveMovie={saveMovie}
          deleteMovie={deleteMovie}
          savedMovies={savedMovies}
        />
    </section>
  );
}

export default Movies;
