import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
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
//Импорт экземпляра класса Api
import { api } from '../../utils/MainApi';

//Импорт объекта контекста
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const headerArray = ["/", "/movies", "/saved-movies", "/profile"];
const footerArray = ["/", "/movies", "/saved-movies"];

const movie = sessionStorage.getItem('inputMovie');
const checkbox = JSON.parse(sessionStorage.getItem('shortFilm'));

function App() {

  //Создадим глобальный стейт currentUser с помощью React Context, который встроен в библиотеку React.js
  //Стейт-переменная, отвечающая за данные текущего пользователя
  const [currentUser, setCurrentUser] = React.useState([]);
  
  const [movies, setMovies] = React.useState([]);
  const [moviesFilteredByName, setMoviesFilteredByName] = React.useState([]);
  const [moviesFilteredByCheckbox, setMoviesFilteredByCheckbox] = React.useState([]);
  // Сохраненные фильмы
  const [savedMovies, setSavedMovies] = React.useState([]);
  // Стейт для работы прелоудера
  const [isPreloaderActive, setIsPreloaderActive] = React.useState(true);
  const [isGetError, setIsGetError] = React.useState(false);
  //Создадим стейт-переменную, отвечающую за успешную/неуспешную регистрацию текущего пользователя
  const [registeredIn, setRegisteredIn] = React.useState(false);
  const [isFirstLoadRegister, setIsFirstLoadRegister] = React.useState(false);
  // Аналогично с авторизацией
  const [logIn, setLogIn] = React.useState(false);
  const [isFirstLoadLogin, setIsFirstLoadLogin] = React.useState(false);
  // Аналогично с редактированием профиля
  const [isProfileEditSuccess, setIsProfileEditSuccess] = React.useState(false);
  const [isProfileErrUp, setIsProfileErrUp] = React.useState(false);

  const [errorRegister, setErrorRegister] = React.useState("");
  const [errorProfile, setErrorProfile] = React.useState("");

  const history = useHistory();

  React.useEffect(() => {
    getAllSavedMovies();
  }, []);

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

  const handleLoadRegister = (value) => {
    setIsFirstLoadRegister(value);
  };

  const handlePopupEdit = (value) => {
    setIsProfileEditSuccess(value);
  };

  const handleErrUp = (value) => {
    setIsProfileErrUp(value);
  };

  const handleLoadLogin = (value) => {
    setIsFirstLoadLogin(value);
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
  };

  // Получим с сервера все сохраненные фильмы
  const getAllSavedMovies = () => {
    api.getSavedMovies()
      .then((movies) => {
        setSavedMovies(movies);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Добавляем фильм в сохраненные, если ему был поставлен лайк
  const saveMovie = (movie) => {
    api.saveNewMovie(movie)
      .then((newMovie) => {
        return setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  // Убираем фильм из сохраненных, если лайк был удален
  const deleteMovie = (movie) => {
    // Есть ли такой фильм в сохраненных фильмах
    const necessaryMovie = savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
    if (necessaryMovie) {
      api.deleteSavedMovie(necessaryMovie._id)
        .then(() => {
          const newSavedMovies = savedMovies.filter(savedMovie => savedMovie.movieId !== necessaryMovie.movieId);
          return setSavedMovies(newSavedMovies);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleRegisterFormSubmit = (name, email, password) => {
    api.register(name, email, password)
    .then(() => {
      setRegisteredIn(true);
      handleLoadRegister(true);
      handleLoginFormSubmit(email, password);
    })
    .catch((err) => {
      setRegisteredIn(false);
      handleLoadRegister(false);
      setErrorRegister(err.statusRes);
    });
  };

  const getInfoUser = () => {
    api.getInfoUser()
    .then((userInfoObject) => {
      setLogIn(true);
      setCurrentUser(userInfoObject);
    })
    .catch((err) => {
      setLogIn(false);
      console.log(err);
    });
  };

  const handleLoginFormSubmit = (email, password) => {
    api.login(email, password)
    .then(() => {
      getInfoUser();
      setLogIn(true);
      handleLoadLogin(true);
      history.push('/movies');
    })
    .catch((err) => {
      setLogIn(false);
      handleLoadLogin(false);
      console.log(err);
    });
  };

  const handleProfileFormSubmit = (name, email) => {
    api.changeInfoUser(name, email)
    .then((res) => {
      setCurrentUser(res);
      handlePopupEdit(true);
      handleErrUp(false);
    })
    .catch((err) => {
      handlePopupEdit(false);
      handleErrUp(true);
      setErrorProfile(err.statusRes);
    });
  };

  const handleProfileExit = () => {
    api.exitUserProfile()
    .then(() => {
      setLogIn(false);
      history.push('/');
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Route exact path={headerArray}>
          <Header loggedIn={logIn} />
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
              saveMovie={saveMovie}
              deleteMovie={deleteMovie}
              savedMovies={savedMovies}
            />
          </Route>
          <Route path="/saved-movies">
            <SavedMovies
              // savedMovies={savedMovies}
            />
          </Route>
          <Route path="/signup">
            <Register
              handleRegisterFormSubmit={handleRegisterFormSubmit}
              registeredIn={registeredIn}
              handleLoadRegister={handleLoadRegister}
              isFirstLoadRegister={isFirstLoadRegister}
              errorRegister={errorRegister}
            />
          </Route>
          <Route path="/signin">
            <Login
              handleLoginFormSubmit={handleLoginFormSubmit}
              logIn={logIn}
              handleLoadLogin={handleLoadLogin}
              isFirstLoadLogin={isFirstLoadLogin}
            />
          </Route>
          <Route path="/profile">
            <Profile
              handleProfileFormSubmit={handleProfileFormSubmit}
              isProfileEditSuccess={isProfileEditSuccess}
              handlePopupEdit={handlePopupEdit}
              getInfoUser={getInfoUser}
              isProfileErrUp={isProfileErrUp}
              handleErrUp={handleErrUp}
              errorProfile={errorProfile}
              onClickExitProfile={handleProfileExit}
            />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
        <Route exact path={footerArray}>
          <Footer />
        </Route>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
