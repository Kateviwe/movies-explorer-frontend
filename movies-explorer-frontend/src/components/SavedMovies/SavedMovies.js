import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({
  // savedMovies
}) {
  return (
    <section className="savedMovies">
        <SearchForm />
        <MoviesCardList
          isSavedMovies={true}
          // savedMovies={savedMovies}
        />
    </section>
  );
}

export default SavedMovies;
