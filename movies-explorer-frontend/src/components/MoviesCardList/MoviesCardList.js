import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({isSavedMovies}) {
  return (
    <div className="moviesCardList">
        <ul className="moviesCardList__cards">
            <li className="moviesCardList__card"><MoviesCard isSavedMovies={isSavedMovies} /></li>
            <li className="moviesCardList__card"><MoviesCard isSavedMovies={isSavedMovies} /></li>
        </ul>
        {isSavedMovies ?
          <div className="moviesCardList__savedMovies-div"></div>
        :
          <button className="moviesCardList__button" type="button">
            <p className="moviesCardList__button-text">Ещё</p>
          </button>
        }
    </div>
  );
}

export default MoviesCardList;
