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
  checkbox
}) {
  return (
    <section className="movies">
        <SearchForm
          movies={movies}
          moviesFilteredByName={moviesFilteredByName}
          handleSearchMovies={handleSearchMovies}
          handleCheckbox={handleCheckbox}
          movie={movie}
          checkbox ={checkbox}
        />
        <MoviesCardList
          isSavedMovies={false}
          moviesFilteredByCheckbox={moviesFilteredByCheckbox}
        />
    </section>
  );
}

export default Movies;
