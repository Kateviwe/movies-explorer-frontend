import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({
  isSavedMovies,
  isPreloaderActive,
  isGetError,
  isFirstLoad,
  saveMovie,
  deleteMovie,
  filteredMovies,
  savedBeatMovies,
  filteredSavedMovies,
  inputSavedState,
  checkboxSavedState
}) {

  const [shownMovies, setShownMovies] = React.useState([]);
  const [shownSavedMovies, setShownSavedMovies] = React.useState([]);

  const checkWindowWidth = (moviesArray, windowWidth) => {
    if(windowWidth > 768) {
      setShownMovies(moviesArray.slice(0, 12));
    } else if (windowWidth <= 768 && windowWidth > 480) {
      setShownMovies(moviesArray.slice(0, 8));
    } else {
      setShownMovies(moviesArray.slice(0, 5));
    }
  };

  // movies
  React.useEffect(() => {
    if(!isSavedMovies && filteredMovies != null) {
      checkWindowWidth(filteredMovies, window.innerWidth);
    }
  }, [filteredMovies, isSavedMovies]);

  // saved-movies
  React.useEffect(() => {
    if(isSavedMovies && filteredSavedMovies != null) {
      setShownSavedMovies(filteredSavedMovies);
    }
  }, [filteredSavedMovies, isSavedMovies, inputSavedState, checkboxSavedState, savedBeatMovies]);

  // Слушаем изменение ширины экрана устройства
  window.addEventListener('resize', function() {
    // Задержка вызова функции в мс
    const delay = 200;
    if(filteredMovies != null) {
      setTimeout(checkWindowWidth(filteredMovies, window.innerWidth), delay);
    }
  });

  const onAddButtonClick = () => {
    const arrayLength = shownMovies.length;
    const windowWidth = window.innerWidth;
    if(windowWidth > 768) {
      setShownMovies(filteredMovies.slice(0, arrayLength + 4));
    } else {
      setShownMovies(filteredMovies.slice(0, arrayLength + 2));
    }
  };
      
  return (
    <>
      {isSavedMovies ?
        // Сохраненные фильмы
        <div className="moviesCardList">
          <ul className="moviesCardList__cards" >
            { filteredSavedMovies != null ?
              shownSavedMovies.map(movie =>
                <li key={movie.movieId} className="moviesCardList__card">
                    <MoviesCard
                        isSavedMovies={isSavedMovies}
                        movie={movie}
                        saveMovie={saveMovie}
                        deleteMovie={deleteMovie}
                        savedBeatMovies={savedBeatMovies}
                    />
                </li>
              )
              : ""
            }
          </ul>
          <div className="moviesCardList__savedMovies-div"></div>
        </div>
        :
        // Фильмы
        <div className="moviesCardList">
            <p className={`moviesCardList__not-found ${((!isFirstLoad || localStorage.getItem('inputState') !== null) && filteredMovies != null && filteredMovies.length === 0 && !isPreloaderActive && !isGetError) ? "moviesCardList__not-found_active" : ""}`}>Ничего не найдено</p>
            <p className={`moviesCardList__not-found ${isGetError ? "moviesCardList__not-found_active" : ""}`}>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>
            <ul className={`moviesCardList__cards ${isPreloaderActive ? "moviesCardList__cards_type_preloader" : ""}`} >
              {(!isPreloaderActive || isGetError) ? filteredMovies != null ?
                  shownMovies.map(movie =>
                    <li key={movie.id} className="moviesCardList__card">
                        <MoviesCard
                            isSavedMovies={isSavedMovies}
                            movie={movie}
                            saveMovie={saveMovie}
                            deleteMovie={deleteMovie}
                            savedBeatMovies={savedBeatMovies}
                        />
                    </li>
                  )
                : ""
                : <li><Preloader /></li>
              }

            </ul>
            <button
              className={`moviesCardList__button ${(filteredMovies != null && filteredMovies.length - shownMovies.length !== 0) ? "moviesCardList__button_active" : ""}`}
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
