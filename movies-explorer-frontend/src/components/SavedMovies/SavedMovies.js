import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({
  isPreloaderActive,
  handleSearchSavedMovies,
  savedMoviesFilteredByName,
  savedMoviesByCheckbox,
  handleCheckboxSavedMovies,
  saveMovie,
  deleteMovie,
  savedMovies,
}) {
  return (
    <section className="savedMovies">
        <SearchForm
          isSavedMovies={true}
          handleSearchSavedMovies={handleSearchSavedMovies}
          savedMoviesFilteredByName={savedMoviesFilteredByName}
          handleCheckboxSavedMovies={handleCheckboxSavedMovies}
          savedMovies={savedMovies}
        />
        <MoviesCardList
          isSavedMovies={true}
          isPreloaderActive={isPreloaderActive}
          saveMovie={saveMovie}
          deleteMovie={deleteMovie}
          savedMovies={savedMovies}
          savedMoviesByCheckbox={savedMoviesByCheckbox}
        />
    </section>
  );
}

export default SavedMovies;
