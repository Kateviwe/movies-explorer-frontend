import './MoviesCard.css';
import movie from '../../images/moviesCard__image.png';

const isCardLiked = true;

function MoviesCard({isSavedMovies}) {
  return (
    <div className="moviesCard">
        <img className="moviesCard__image" src={movie} alt="Картинка к фильму." />
        <div className="moviesCard__wrapper">
            <h3 className="moviesCard__sign">33 слова о дизайне</h3>
            <button className={`moviesCard__button ${isCardLiked ? "moviesCard__button_active" : ""} ${isSavedMovies ? "moviesCard__button_type_savedMovies" : ""}`} type="button"></button>
        </div>
        <p className="moviesCard__film-duration">1ч 42м</p>
    </div>
  );
}

export default MoviesCard;
