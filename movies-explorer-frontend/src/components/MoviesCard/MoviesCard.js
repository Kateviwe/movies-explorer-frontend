import React from 'react';
import './MoviesCard.css';

function MoviesCard({
  isSavedMovies,
  movie,
  saveMovie,
  deleteMovie,
  savedMovies
}) {

  const [isCardLiked, setIsCardLiked] = React.useState(false);

  const movieHours = Math.floor(movie.duration / 60);
  const movieMinutes = (movie.duration % 60);

  React.useEffect (() => {
    savedMovies.find((item) => {
      if(item.movieId === movie.id) {
        setIsCardLiked(true);
      }
    })
  }, [])

  //Обработчик клика по лайку
  const handleLikeClick = () => {
    if (isSavedMovies) {
        deleteMovie(movie);
        setIsCardLiked(false);
    } else {
      if (isCardLiked) {
        deleteMovie(movie);
        setIsCardLiked(false);
      } else {
        saveMovie(movie);
        setIsCardLiked(true);
      }
    }
  };

  return (
    <div className="moviesCard">
        <a href={movie.trailerLink} target="_blank" rel="noreferrer">
          <img
            className="moviesCard__image" 
            src={isSavedMovies ? movie.image : `https://api.nomoreparties.co${movie.image.url}`} 
            alt={movie.description}
          />
        </a>
        <div className="moviesCard__wrapper">
            <h3 className="moviesCard__sign">{movie.nameRU}</h3>
            <button
              className={`moviesCard__button ${isCardLiked ? "moviesCard__button_active" : ""} ${isSavedMovies ? "moviesCard__button_type_savedMovies" : ""}`}
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
