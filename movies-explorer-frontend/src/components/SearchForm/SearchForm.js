import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({
  movies,
  moviesFilteredByName,
  handleSearchMovies,
  handleCheckbox,
  movie,
  checkbox
}) {

  const [inputValue, setInputValue] = React.useState(movie);
  const [isInputValid, setIsInputValid] = React.useState(true);
  const [isShortFilm, setIsShortFilm] = React.useState(checkbox);

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    if (inputValue) {
      setIsInputValid(true);
      const moviesWithName = handleSearchMovies(inputValue, movies);
      handleCheckbox(isShortFilm, moviesWithName);
      sessionStorage.setItem('inputMovie', inputValue);
    } else {
      setIsInputValid(false);
    }
  };

  const handleCheckboxChange = (checkboxState) => {
    setIsShortFilm(checkboxState);
    sessionStorage.setItem('shortFilm', checkboxState);
    handleCheckbox(checkboxState, moviesFilteredByName);
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
            <span className={`searchForm__span ${(isInputValid || inputValue) ? "" : "searchForm__span_active" }`}>Нужно ввести ключевое слово</span>
        </form>
        <FilterCheckbox isShortFilm={isShortFilm} handleCheckboxChange={handleCheckboxChange} />
    </div>
  );
}

export default SearchForm;
