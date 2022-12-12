import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({
  isSavedMovies,
  handleLoad,
  handleInputState,
  handleCheckboxState,
  initialInput,
  initialCheckbox,
  handlePreloader,
  handleCheckboxSearchSubmit,
  handleInputSavedState,
  handleCheckboxSavedState
}) {

  // movies
  const [input, setInput] = React.useState(initialInput ?? '');
  const [isShort, setIsShort] = React.useState(initialCheckbox ?? false);
  const [isInputValid, setIsInputValid] = React.useState(true);

  // saved-movies
  const [savedInput, setSavedInput] = React.useState('');
  const [isSavedShort, setSavedIsShort] = React.useState(false);

  // movies: перерендер фильмов сразу при нажатии на чекбокс
  React.useEffect (() => {
    if(!isSavedMovies && localStorage.getItem('inputState')) {
      handleCheckboxSearchSubmit(isShort);
    }
  }, [isShort]);

  // saved-movies: перерендер фильмов сразу при нажатии на чекбокс
  React.useEffect (() => {
    if(isSavedMovies) {
      handleCheckboxSavedState(isSavedShort);
    }
  }, [isSavedShort]);

  // movies: инпут
  const handleChangeInputValue = (evt) => {
    setInput(evt.target.value);
  };

  // movies: чекбокс
  const handleIsShort = (value) => {
    setIsShort(value);
  };

  // saved-movies: инпут
  const handleChangeSavedInputValue = (evt) => {
    setSavedInput(evt.target.value);
  };

  // saved-movies: чекбокс
  const handleIsSavedShort = (value) => {
    setSavedIsShort(value);
  };

  // Обработчик отправки формы
  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    if(!isSavedMovies) {
      // Если в инпут что-то ввели
      if (input) {
        if(!localStorage.getItem('beatMovies')) {
          handlePreloader(true);
        }
        setIsInputValid(true);
        handleLoad(false);
        // Инпут формы
        localStorage.setItem('inputState', input);
        const savedInput = localStorage.getItem('inputState');
        handleInputState(savedInput);
      } else {
        setIsInputValid(false);
      }
      // Состояние чекбокса
      const savedCheckbox = JSON.parse(localStorage.getItem('checkboxState'));
      handleCheckboxState(savedCheckbox);
    } else {
      handleInputSavedState(savedInput);
      handleCheckboxSavedState(isSavedShort);
    }
  };

  return (
    <div className="searchForm">
        <form
          className="searchForm__form"
          name="searchForm"
          onSubmit={handleFormSubmit}
          noValidate
        >
            <fieldset className="searchForm__fieldset">
                <input
                    id="searchFilm-input"
                    className="searchForm__input"
                    type="text"
                    name="searchFilm"
                    placeholder="Фильм"
                    required
                    value={!isSavedMovies ? input : savedInput}
                    onChange={!isSavedMovies ? handleChangeInputValue : handleChangeSavedInputValue}
                />
            </fieldset>
            <button className="searchForm__find-button" type="submit">Найти</button>
            <span className={`searchForm__span ${(!isSavedMovies ? (isInputValid || input) : true) ? "" : "searchForm__span_active" }`}>Нужно ввести ключевое слово</span>
        </form>
        <FilterCheckbox
          isSavedMovies={isSavedMovies}
          isShort={isShort}
          handleIsShort={handleIsShort}
          handleIsSavedShort={handleIsSavedShort}
          isSavedShort={isSavedShort}
        />
    </div>
  );
}

export default React.memo(SearchForm);
