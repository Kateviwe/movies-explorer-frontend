import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({
  isSavedMovies,
  movies,
  moviesFilteredByName,
  handleSearchMovies,
  handleCheckbox,
  movie,
  checkbox,
  handleLoad,
  handleSearchSavedMovies,
  handleCheckboxSavedMovies,
  savedMoviesFilteredByName,
  savedMovies,
}) {

  const [inputValue, setInputValue] = React.useState('');
  const [isInputValid, setIsInputValid] = React.useState(true);
  const [isShortFilm, setIsShortFilm] = React.useState(checkbox);
  const [isSavedShortFilm, setIsSavedShortFilm] = React.useState(false);

  React.useEffect(() => {
    if (!isSavedMovies) {
      setInputValue(sessionStorage.getItem('inputMovie'));
      setIsShortFilm(JSON.parse(sessionStorage.getItem('shortFilm')));
    }
  }, [])

  const handleShortFilm = (value) => {
    setIsShortFilm(value);
  };
  
  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    if (inputValue || isSavedMovies) {
      setIsInputValid(true);
      if (!isSavedMovies) {
        const moviesWithName = handleSearchMovies(inputValue, movies);
        handleCheckbox(isShortFilm, moviesWithName);
        handleLoad(false);
        sessionStorage.setItem('inputMovie', inputValue);
      } else {
        const savedMoviesWithName = handleSearchSavedMovies(inputValue || "", savedMovies);
        handleCheckboxSavedMovies(isSavedShortFilm, savedMoviesWithName);
      }
    } else {
      setIsInputValid(false);
    }
  };
  
  const handleCheckboxChange = (checkboxState) => {
    if (!isSavedMovies) {
      handleLoad(false);
      handleShortFilm(checkboxState);
      sessionStorage.setItem('shortFilm', checkboxState);
      handleCheckbox(checkboxState, moviesFilteredByName);
    } else {
      setIsSavedShortFilm(checkboxState);
      handleCheckboxSavedMovies(checkboxState, savedMoviesFilteredByName);
    }
  };

  const handleChangeInputValue = (evt) => {
    setInputValue(evt.target.value);
  };
  
  return (
    <div className="searchForm">
        <form className="searchForm__form" name="searchForm" onSubmit={handleFormSubmit} noValidate>
            <fieldset className="searchForm__fieldset">
                <input
                    id="searchFilm-input"
                    className="searchForm__input"
                    type="text"
                    name="searchFilm"
                    placeholder="Фильм"
                    required
                    value={inputValue || "" }
                    onChange={handleChangeInputValue}
                />
            </fieldset>
            <button className="searchForm__find-button" type="submit">Найти</button>
            <span className={`searchForm__span ${((isInputValid || inputValue)) ? "" : "searchForm__span_active" }`}>Нужно ввести ключевое слово</span>
        </form>
        <FilterCheckbox
          isShortFilm={isShortFilm}
          handleCheckboxChange={handleCheckboxChange}
          isSavedMovies={isSavedMovies}
          handleShortFilm={handleShortFilm}
        />
    </div>
  );
}

export default SearchForm;
