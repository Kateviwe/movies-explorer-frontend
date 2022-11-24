import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies() {
  return (
    <section className="savedMovies">
        <SearchForm />
        <MoviesCardList isSavedMovies={true} />
    </section>
  );
}

export default SavedMovies;
