import './MoviesCard.css';
const isCardLiked = true;

function MoviesCard({isSavedMovies, movie}) {

  const movieHours = Math.floor(movie.duration / 60);
  const movieMinutes = (movie.duration % 60);

  return (
    <div className="moviesCard">
        <a href={movie.trailerLink} target="_blank" rel="noreferrer">
          <img className="moviesCard__image" src={`https://api.nomoreparties.co${movie.image.url}`} alt={movie.description} />
        </a>
        <div className="moviesCard__wrapper">
            <h3 className="moviesCard__sign">{movie.nameRU}</h3>
            <button className={`moviesCard__button ${isCardLiked ? "moviesCard__button_active" : ""} ${isSavedMovies ? "moviesCard__button_type_savedMovies" : ""}`} type="button"></button>
        </div>
        <p className="moviesCard__film-duration">{`${movieHours}ч ${movieMinutes}м`}</p>
    </div>
  );
}

export default MoviesCard;
