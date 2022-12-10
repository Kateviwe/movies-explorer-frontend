import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({
  isPreloaderActive,
  saveMovie,
  deleteMovie,
  savedBeatMovies,
  filteredSavedMovies,
  handleInputSavedState,
  handleCheckboxSavedState,
  inputSavedState,
  checkboxSavedState
}) {
  
  // saved-movies
  React.useEffect(() => {
    handleInputSavedState('');
    handleCheckboxSavedState(false);
  }, []);

  return (
    <section className="savedMovies">
        <SearchForm
          isSavedMovies={true}
          handleInputSavedState={handleInputSavedState}
          handleCheckboxSavedState={handleCheckboxSavedState}
        />
        <MoviesCardList
          isSavedMovies={true}
          isPreloaderActive={isPreloaderActive}
          saveMovie={saveMovie}
          deleteMovie={deleteMovie}
          savedBeatMovies={savedBeatMovies}
          filteredSavedMovies={filteredSavedMovies}
          inputSavedState={inputSavedState}
          checkboxSavedState={checkboxSavedState}
        />
    </section>
  );
}

export default SavedMovies;
