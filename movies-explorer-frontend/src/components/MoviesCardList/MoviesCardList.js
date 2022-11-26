import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({isSavedMovies, moviesFilteredByCheckbox}) {

  //Вынесем маппинг из JSX разметки в сам компонент для повышения читабельности кода
  const moviesElements = moviesFilteredByCheckbox.map(movie => 
    <li key={movie.id} className="moviesCardList__card">
        <MoviesCard
            isSavedMovies={isSavedMovies}
            movie={movie}
            key={movie.id}
        />
    </li>
  );

  return (
    <div className="moviesCardList">
        <ul className="moviesCardList__cards">
          {moviesElements}
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
