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
  // Ширина экрана
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);

  const handleWindowChange = () => {
    setScreenWidth(window.innerWidth);
    const delay = 200;
    if(filteredMovies != null) {
      setTimeout(checkWindowWidth(filteredMovies), delay);
    }
  };

  // Изменение ширины экрана устройства
  React.useEffect(() => {
    window.addEventListener('resize', handleWindowChange);
    // Если из хука вернуть функцию, она выполнится на размонтировании, однократно
    return () => {
      window.removeEventListener("resize", handleWindowChange);
    };
  }, [screenWidth]);

  const checkWindowWidth = (moviesArray) => {
    if(screenWidth > 768) {
      setShownMovies(moviesArray.slice(0, 12));
    } else if (screenWidth <= 768 && screenWidth > 480) {
      setShownMovies(moviesArray.slice(0, 8));
    } else {
      setShownMovies(moviesArray.slice(0, 5));
    }
  };

  // movies
  React.useEffect(() => {
    if(!isSavedMovies && filteredMovies != null) {
      checkWindowWidth(filteredMovies);
    }
  }, [filteredMovies, isSavedMovies, screenWidth]);

  // saved-movies
  React.useEffect(() => {
    if(isSavedMovies && filteredSavedMovies != null) {
      setShownSavedMovies(filteredSavedMovies);
    }
  }, [filteredSavedMovies, isSavedMovies, inputSavedState, checkboxSavedState, savedBeatMovies]);

  const onAddButtonClick = () => {
    const arrayLength = shownMovies.length;
    if(screenWidth > 1279) {
      setShownMovies(filteredMovies.slice(0, arrayLength + 4));
    } else if(screenWidth <= 1279 && screenWidth >= 990) {
      setShownMovies(filteredMovies.slice(0, arrayLength + 3));
    } else {
      setShownMovies(filteredMovies.slice(0, arrayLength + 2));
    }
  };

  const checkCardLike = (movie) => {
    return savedBeatMovies.find((item) => {
      return item.movieId === movie.id;
    })
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
                        isLiked={checkCardLike(movie)}
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
                            isLiked={checkCardLike(movie)}
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
