import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({
  isPreloaderActive,
  isGetError,
  saveMovie,
  deleteMovie,
  filteredMovies,
  handleInputState,
  handleCheckboxState,
  handlePreloader,
  savedBeatMovies
}) {

  const [isFirstLoad, setIsFirstLoad] = React.useState(false);

  // Логика сохранения инпута и чекбокса при сабмите формы поиска фильмов
  React.useEffect(() => {
    if (localStorage.getItem('inputState') || localStorage.getItem('checkboxState')) {
      const savedInput = localStorage.getItem('inputState') ?? '';
      const savedCheckbox = JSON.parse(localStorage.getItem('checkboxState')) ?? false;
      handleInputSearchSubmit(savedInput);
      handleCheckboxSearchSubmit(savedCheckbox);
    };
  }, []);

  const handleInputSearchSubmit = React.useCallback((input) => {
    localStorage.setItem('inputState', input);
    handleInputState(input);
  }, []);

  const handleCheckboxSearchSubmit = React.useCallback((checkbox) => {
    localStorage.setItem('checkboxState', checkbox);
    handleCheckboxState(checkbox);
  }, []);

  const handleLoad = (value) => {
    setIsFirstLoad(value);
  };

  return (
    <section className="movies">
        <SearchForm
          isSavedMovies={false}
          handleLoad={handleLoad}
          handleInputState={handleInputState}
          handleCheckboxState={handleCheckboxState}
          initialInput={localStorage.getItem('inputState')}
          initialCheckbox={JSON.parse(localStorage.getItem('checkboxState'))}
          handlePreloader={handlePreloader}
          handleCheckboxSearchSubmit={handleCheckboxSearchSubmit}
        />
        <MoviesCardList
          isSavedMovies={false}
          isPreloaderActive={isPreloaderActive}
          isGetError={isGetError}
          isFirstLoad={isFirstLoad}
          saveMovie={saveMovie}
          deleteMovie={deleteMovie}
          filteredMovies={filteredMovies}
          savedBeatMovies={savedBeatMovies}
        />
    </section>
  );
}

// React.memo() - компонент перестаёт автоматически перерендериваться при перерендере родителя, только при изменении пропсов
export default React.memo(Movies);



