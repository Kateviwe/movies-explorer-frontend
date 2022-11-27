import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import PageNotFound from '../PageNotFound/PageNotFound';

//Импорт экземпляра класса MoviesApi
import { moviesApi } from '../../utils/MoviesApi';


const headerArray = ["/", "/movies", "/saved-movies", "/profile"];
const footerArray = ["/", "/movies", "/saved-movies"];

const movie = sessionStorage.getItem('inputMovie');
const checkbox = JSON.parse(sessionStorage.getItem('shortFilm'));

const loggedIn = false;

function App() {

  const [movies, setMovies] = React.useState([]);
  const [moviesFilteredByName, setMoviesFilteredByName] = React.useState([]);
  const [moviesFilteredByCheckbox, setMoviesFilteredByCheckbox] = React.useState([]);
  // Стейт для работы прелоудера
  const [isPreloaderActive, setIsPreloaderActive] = React.useState(true);
  const [isGetError, setIsGetError] = React.useState(false);

  React.useEffect(() => {
    moviesApi.getMoviesFromServer()
      .then((moviesList) => {
        setMovies(moviesList);
        const initialMovies = handleSearchMovies(movie, moviesList);
        handleCheckbox(checkbox, initialMovies);
      })
      .then(() => {
        setIsGetError(false);
      })
      .catch((err) => {
        setIsGetError(true);
        console.log(err);
      });
  }, []);

  // Работа прелоудера
  const handlePreloader = (value) => {
    setIsPreloaderActive(value);
  };
  
  // Фильтрация фильмов по имени
  const handleSearchMovies = (filmName, initialMovies) => {
    const filteredMovies = initialMovies.filter(function (film) {
      return film.nameRU.includes(filmName);
    });
    setMoviesFilteredByName(filteredMovies);
    return filteredMovies;
  };

  // Фильтрация фильмов по состоянию чекбокса
  const handleCheckbox = (stateCheckbox, moviesWithName) => {
    if (stateCheckbox) {
      const filteredByNameAndCheckbox = moviesWithName.filter(function (film) {
        return film.duration <= 40;
      });
      setMoviesFilteredByCheckbox(filteredByNameAndCheckbox);
      handlePreloader(false);
      return filteredByNameAndCheckbox;
    }
    setMoviesFilteredByCheckbox(moviesWithName);
    handlePreloader(false);
    return moviesWithName;
  }

  return (
    <div className="app">
      <Route exact path={headerArray}>
        <Header loggedIn={loggedIn} />
      </Route>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/movies">
          <Movies
            movies={movies}
            moviesFilteredByName={moviesFilteredByName}
            moviesFilteredByCheckbox={moviesFilteredByCheckbox}
            handleSearchMovies={handleSearchMovies}
            handleCheckbox={handleCheckbox}
            movie={movie}
            checkbox={checkbox}
            isPreloaderActive={isPreloaderActive}
            isGetError={isGetError}
          />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      <Route exact path={footerArray}>
        <Footer />
      </Route>
    </div>
  );
}

export default App;
