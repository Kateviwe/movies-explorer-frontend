import React from 'react';
import './MoviesCard.css';

function MoviesCard({
  isSavedMovies,
  movie,
  saveMovie,
  deleteMovie,
  isLiked
}) {

  const movieHours = Math.floor(movie.duration / 60);
  const movieMinutes = (movie.duration % 60);

  //Обработчик клика по лайку
  const handleLikeClick = () => {
    if(isSavedMovies) {
        deleteMovie(movie);
    } else {
      if(isLiked) {
        deleteMovie(movie);
      } else {
        saveMovie(movie);
      }
    }
  };

  return (
    <div className="moviesCard">
        <a href={!isSavedMovies ? movie.trailerLink : movie.trailer} target="_blank" rel="noreferrer">
          <img
            className="moviesCard__image" 
            src={isSavedMovies ? movie.image : `https://api.nomoreparties.co${movie.image.url}`} 
            alt={movie.description}
          />
        </a>
        <div className="moviesCard__wrapper">
            <h3 className="moviesCard__sign">{movie.nameRU}</h3>
            <button
              className={`moviesCard__button ${isLiked ? "moviesCard__button_active" : ""} ${isSavedMovies ? "moviesCard__button_type_savedMovies" : ""}`}
              type="button"
              onClick={handleLikeClick}
            >
            </button>
        </div>
        <p className="moviesCard__film-duration">{`${movieHours}ч ${movieMinutes}м`}</p>
    </div>
  );
}

export default MoviesCard;
