import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({
  isSavedMovies,
  moviesFilteredByCheckbox,
  isPreloaderActive,
  isGetError
}) {

  const [shownMovies, setShownMovies] = React.useState([]);

  React.useEffect(() => {
    if(window.innerWidth > 768) {
      setShownMovies(moviesFilteredByCheckbox.slice(0, 12));
    } else if (window.innerWidth <= 768 && window.innerWidth > 480) {
      setShownMovies(moviesFilteredByCheckbox.slice(0, 8));
    } else {
      setShownMovies(moviesFilteredByCheckbox.slice(0, 5));
    }
  }, [moviesFilteredByCheckbox]);

    //Вынесем маппинг из JSX разметки в сам компонент для повышения читабельности кода
  let moviesElements = shownMovies.map(movie => 
    <li key={movie.id} className="moviesCardList__card">
        <MoviesCard
            isSavedMovies={isSavedMovies}
            movie={movie}
            key={movie.id}
        />
    </li>
  );

  const onAddButtonClick = () => {
    const arrayLength = shownMovies.length;
    if(window.innerWidth > 768) {
      setShownMovies(moviesFilteredByCheckbox.slice(0, arrayLength + 4));
    } else {
      setShownMovies(moviesFilteredByCheckbox.slice(0, arrayLength + 2));
    }
  };


  return (
    <div className="moviesCardList">
        <p className={`moviesCardList__not-found ${(moviesElements.length === 0 && !isPreloaderActive && !isGetError) ? "moviesCardList__not-found_active" : ""}`}>Ничего не найдено</p>
        <p className={`moviesCardList__not-found ${isGetError ? "moviesCardList__not-found_active" : ""}`}>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>
        <ul className={`moviesCardList__cards ${isPreloaderActive ? "moviesCardList__cards_type_preloader" : ""}`} >
          {(isPreloaderActive && !isGetError) ? <li><Preloader /></li> : moviesElements}
        </ul>
        {isSavedMovies ?
          <div className="moviesCardList__savedMovies-div"></div>
        :
          <button
            className={`moviesCardList__button ${(moviesFilteredByCheckbox.length - shownMovies.length !== 0) ? "moviesCardList__button_active" : ""}`}
            type="button"
            onClick={onAddButtonClick}
          >
            <p className="moviesCardList__button-text">Ещё</p>
          </button>
        }
    </div>
  );
}

export default MoviesCardList;
