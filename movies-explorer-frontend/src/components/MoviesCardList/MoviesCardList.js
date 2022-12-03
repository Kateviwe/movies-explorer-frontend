import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({
  isSavedMovies,
  moviesFilteredByCheckbox,
  isPreloaderActive,
  isGetError,
  isFirstLoad,
  saveMovie,
  deleteMovie,
  savedMovies
  // Сохраненные фильмы
  // savedMovies
}) {

  const [shownMovies, setShownMovies] = React.useState([]);

  const checkWindowWidth = (moviesArray, windowWidth) => {
    if(windowWidth > 768) {
      setShownMovies(moviesArray.slice(0, 12));
    } else if (windowWidth <= 768 && windowWidth > 480) {
      setShownMovies(moviesArray.slice(0, 8));
    } else {
      setShownMovies(moviesArray.slice(0, 5));
    }
  };
  
  React.useEffect(() => {
    if(!isSavedMovies) {
      checkWindowWidth(moviesFilteredByCheckbox, window.innerWidth);
    }
  }, [moviesFilteredByCheckbox]);

  // Слушаем изменение ширины экрана устройства
  window.addEventListener('resize', function() {
    // Задержка вызова функции в мс
    const delay = 200;
    setTimeout(checkWindowWidth(moviesFilteredByCheckbox, window.innerWidth), delay);
  });

  const onAddButtonClick = () => {
    const arrayLength = shownMovies.length;
    const windowWidth = window.innerWidth;
    if(windowWidth > 768) {
      setShownMovies(moviesFilteredByCheckbox.slice(0, arrayLength + 4));
    } else {
      setShownMovies(moviesFilteredByCheckbox.slice(0, arrayLength + 2));
    }
  };
  //Вынесем маппинг из JSX разметки в сам компонент для повышения читабельности кода
  let moviesElements = shownMovies.map(movie => 
    <li key={movie.id} className="moviesCardList__card">
        <MoviesCard
            isSavedMovies={isSavedMovies}
            movie={movie}
            key={movie._id}
            saveMovie={saveMovie}
            deleteMovie={deleteMovie}
            savedMovies={savedMovies}
            // Сохраненные фильмы
            // savedMovies={savedMovies}
        />
    </li>
  );

  return (
    <>
      {isSavedMovies ?
        // Сохраненные фильмы
        <div className="moviesCardList">
          {/* <p className={`moviesCardList__not-found ${isGetError ? "moviesCardList__not-found_active" : ""}`}>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p> */}
          <ul className="moviesCardList__cards" >
            {savedMovies}
            {/* (isPreloaderActive && !isGetError) ? <li><Preloader /></li> :  */}
          </ul>
          <div className="moviesCardList__savedMovies-div"></div>
        </div>
        :
        // Фильмы
        <div className="moviesCardList">
            <p className={`moviesCardList__not-found ${((!isFirstLoad || sessionStorage.getItem('shortFilm') !== null) && moviesElements.length === 0 && !isPreloaderActive && !isGetError) ? "moviesCardList__not-found_active" : ""}`}>Ничего не найдено</p>
            <p className={`moviesCardList__not-found ${isGetError ? "moviesCardList__not-found_active" : ""}`}>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>
            <ul className={`moviesCardList__cards ${isPreloaderActive ? "moviesCardList__cards_type_preloader" : ""}`} >
              {(isPreloaderActive && !isGetError) ? <li><Preloader /></li> : moviesElements}
            </ul>
            <button
              className={`moviesCardList__button ${(moviesFilteredByCheckbox.length - shownMovies.length !== 0) ? "moviesCardList__button_active" : ""}`}
              type="button"
              onClick={onAddButtonClick}
            >
              <p className="moviesCardList__button-text">Ещё</p>
            </button>
        </div>
      }
    </>
  );
}

export default MoviesCardList;
