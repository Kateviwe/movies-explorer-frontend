import React from 'react';
import { Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

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
  const [savedMoviesFilteredByName, setSavedMoviesFilteredByName] = React.useState([]);
  const [savedMoviesByCheckbox, setSavedMoviesByCheckbox] = React.useState([]);
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

  // const [checkbox, setCheckbox] = React.useState(false);
  // React.useEffect(() => {
  //   setCheckbox(JSON.parse(sessionStorage.getItem('shortFilm')));
  // },[])
  // const path = useLocation();

  // React.useEffect(() => {
    // getInfoUser();
    // console.log(path.pathname)
  //   history.push(path.pathname)
  // },[]);

  React.useEffect(() => {
    handleGetSavedMovies();
  }, [,logIn]);

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
  }, [,logIn]);

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

  const handleGetSavedMovies = () => {
    api.getSavedMovies()
      .then((movies) => {
        setSavedMovies(movies);
        const initialSavedMovies = handleSearchSavedMovies("", movies)
        handleCheckboxSavedMovies(false, initialSavedMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Фильтрация фильмов по имени
  const handleSearchMovies = (filmName, initialMovies) => {
    if(filmName) {
      const filteredMovies = initialMovies.filter(function (film) {
        return film.nameRU.toLowerCase().includes(filmName.toLowerCase());
      });
      setMoviesFilteredByName(filteredMovies);
      return filteredMovies;
    } else {
      setMoviesFilteredByName(initialMovies);
      return initialMovies;
    }
  };

  // Фильтрация сохраненных фильмов по имени 
  const handleSearchSavedMovies = (filmName, initialSavedMovies) => {
    const filteredMovies = initialSavedMovies.filter(function (film) {
      return film.nameRU.toLowerCase().includes(filmName.toLowerCase());
    });
    setSavedMoviesFilteredByName(filteredMovies);
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

  // Фильтрация сохраненных фильмов по состоянию чекбокса
  const handleCheckboxSavedMovies = (stateCheckbox, savedMoviesWithName) => {
    if (stateCheckbox) {
      const filteredByNameAndCheckbox = savedMoviesWithName.filter(function (film) {
        return film.duration <= 40;
      });
      setSavedMoviesByCheckbox(filteredByNameAndCheckbox);
      return filteredByNameAndCheckbox;
    }
    setSavedMoviesByCheckbox(savedMoviesWithName);
    return savedMoviesWithName;
  };

  // Добавляем фильм в сохраненные, если ему был поставлен лайк
  const saveMovie = (movie) => {
    api.saveNewMovie(movie)
      .then(() => {
        // return setSavedMoviesByCheckbox([newMovie, ...savedMoviesByCheckbox]);
        handleGetSavedMovies();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  // Убираем фильм из сохраненных, если лайк был удален
  const deleteMovie = (movie) => {
    // Есть ли такой фильм в сохраненных фильмах
    const necessaryMovie = savedMovies.find((savedMovie) => (savedMovie.movieId === movie.id || savedMovie.movieId === movie.movieId));
    if (necessaryMovie) {
      api.deleteSavedMovie(necessaryMovie._id)
        .then(() => {
          // const newSavedMovies = savedMovies.filter(savedMovie => savedMovie.movieId !== necessaryMovie.movieId);
          // return setSavedMovies(newSavedMovies);
          handleGetSavedMovies();
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
    .then((res) => {
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
      history.push('/');
      sessionStorage.removeItem('inputMovie');
      sessionStorage.removeItem('shortFilm');
      // setMovies([]);
      // setMoviesFilteredByName([]);
      // setMoviesFilteredByCheckbox([]);
      // setSavedMovies([]);
      // setSavedMoviesFilteredByName([]);
      // setSavedMoviesByCheckbox([]);
      setLogIn(false);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Route exact path={headerArray}>
          <Header
            loggedIn={logIn}
            getInfoUser={getInfoUser}
          />
        </Route>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <ProtectedRoute
              path="/movies"
              component={Movies}
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
              logIn={logIn}
          />
          <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              isPreloaderActive={isPreloaderActive}
              handleSearchSavedMovies={handleSearchSavedMovies}
              savedMoviesFilteredByName={savedMoviesFilteredByName}
              savedMoviesByCheckbox={savedMoviesByCheckbox}
              handleCheckboxSavedMovies={handleCheckboxSavedMovies}
              saveMovie={saveMovie}
              deleteMovie={deleteMovie}
              savedMovies={savedMovies}
              logIn={logIn}
          />
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
          <ProtectedRoute
              path="/profile"
              component={Profile}
              handleProfileFormSubmit={handleProfileFormSubmit}
              isProfileEditSuccess={isProfileEditSuccess}
              handlePopupEdit={handlePopupEdit}
              getInfoUser={getInfoUser}
              isProfileErrUp={isProfileErrUp}
              handleErrUp={handleErrUp}
              errorProfile={errorProfile}
              onClickExitProfile={handleProfileExit}
              logIn={logIn}
          />
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
