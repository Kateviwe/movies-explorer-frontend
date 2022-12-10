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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

//Импорт экземпляра класса MoviesApi
import { moviesApi } from '../../utils/MoviesApi';
//Импорт экземпляра класса Api
import { api } from '../../utils/MainApi';

//Импорт объекта контекста
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const headerArray = ["/", "/movies", "/saved-movies", "/profile"];
const footerArray = ["/", "/movies", "/saved-movies"];

function App() {

  //Создадим глобальный стейт currentUser с помощью React Context, который встроен в библиотеку React.js
  //Стейт-переменная, отвечающая за данные текущего пользователя
  const [currentUser, setCurrentUser] = React.useState([]);

  // Основные стейты для movies
  const [beatMovies, setBeatMovies] = React.useState(null);
  const [inputState, setInputState] = React.useState('');
  const [checkboxState, setCheckboxState] = React.useState(false);

  // Основные стейты для saved-movies
  const [savedBeatMovies, setSavedBeatMovies] = React.useState(null);
  const [inputSavedState, setInputSavedState] = React.useState('');
  const [checkboxSavedState, setCheckSavedboxState] = React.useState(false);

  // Стейт для работы прелоудера
  const [isPreloaderActive, setIsPreloaderActive] = React.useState(false);
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

  // Работа прелоудера
  const handlePreloader = (value) => {
    setIsPreloaderActive(value);
  };

  // movies
  // Получаем фильмы в зависимости от инпута и состояния чекбокса
  // useEffect - это вызов побочного эффекта при изменении переменных в его массиве зависимостей, при рендерах.
  // Он ничего не мемоизирует (как useMemo), просто выполняет что-то по условию при рендере
  React.useEffect (() => {
      if(!beatMovies && (!!inputState || checkboxState)) {
          if (localStorage.getItem('beatMovies')) {
                setBeatMovies(JSON.parse(localStorage.getItem('beatMovies')));
                handlePreloader(false);
          } else {
              // первый поиск
              moviesApi.getMoviesFromServer()
                  .then((moviesList) => {
                      setBeatMovies(moviesList)
                      localStorage.setItem('beatMovies', JSON.stringify(moviesList));
                  })
                  .then(() => {
                      setIsGetError(false);
                      handlePreloader(false);
                  })
                  .catch((err) => {
                      setIsGetError(true);
                      console.log(err);
            });
          }
      }
  }, [beatMovies, inputState, checkboxState]);

  const handleGetSavedMovies = () => {
    api.getSavedMovies()
      .then((savedMoviesList) => {
        setSavedBeatMovies(savedMoviesList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // saved-movies
  // Получение массива сохраненных фильмов
  React.useEffect (() => {
    if(!savedBeatMovies && logIn) {
      handleGetSavedMovies();
    }
  }, [savedBeatMovies, inputSavedState, checkboxSavedState, logIn]);
  
  // movies
  // Фильтруем фильмы по имени и чекбоксу
  // Мемоизация (кеширование) проведённого расчёта (у нас - фильтрации)
  // При каждом рендере React проверяет, изменились ли переменные в массиве зависимостей.
  // Если да - выполняет переданный в эффект коллбек, а если нет- ничего не делает
  // Если из хука вернуть функцию, она выполнится на размонтировании, однократно
  const filteredMovies = React.useMemo(() => {
    if(!beatMovies) {
      return null;
    } else {
      return beatMovies.filter(function (film) {
        if (checkboxState) {
          return (film.duration <= 40 && film.nameRU.toLowerCase().includes(inputState.toLowerCase()));
        } else {
          return film.nameRU.toLowerCase().includes(inputState.toLowerCase());
        }
      });
    }
  }, [beatMovies, inputState, checkboxState]);


// saved-movies
  const filteredSavedMovies = React.useMemo(() => {
    if(!savedBeatMovies) {
      return null;
    } else {
      return savedBeatMovies.filter(function (film) {
        if (checkboxSavedState) {
          return (film.duration <= 40 && film.nameRU.toLowerCase().includes(inputSavedState.toLowerCase()));
        } else {
          return film.nameRU.toLowerCase().includes(inputSavedState.toLowerCase());
        }
      });
    }
  }, [savedBeatMovies, inputSavedState, checkboxSavedState]);

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

  // movies: инпут
  // Защищаемся от изменения пропса с помощью React.useCallback
  // Используем на функциях, которые пойдут в пропсы, чтобы в паре с НОС memo предотвращать многочисленные перерендеры
  // HOC делает дочерние компоненты чистыми, то есть они перестают перерендериваться автоматом.
  // Это будет происходить только при изменении пропсов
  const handleInputState = React.useCallback((value) => {
    setInputState(value);
  }, []);

  // movies: чекбокс
  // Защищаемся от изменения пропса с помощью React.useCallback
  // Хук useCallback предназначен для мемоизации (кэширования) уже не значения,
  // а самой функции - если не меняются те внешние параметры, которые участвуют в расчёте (и указываются в массиве зависимостей),
  // то функция не изменится, и перерендера не произойдёт
  const handleCheckboxState = React.useCallback((value) => {
    setCheckboxState(value);
  }, []); // массив зависимостей внешних параметров (у нас их нет)

  // saved-movies: инпут
  const handleInputSavedState = React.useCallback((value) => {
    setInputSavedState(value);
  }, []);

  // saved-movies: чекбокс
  const handleCheckboxSavedState = React.useCallback((value) => {
    setCheckSavedboxState(value);
  }, []);

  // Добавляем фильм в сохраненные, если ему был поставлен лайк
  const saveMovie = (movie) => {
    api.saveNewMovie(movie)
      .then(() => {
        handleGetSavedMovies();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  // Убираем фильм из сохраненных, если лайк был удален
  const deleteMovie = (movie) => {
    // Есть ли такой фильм в сохраненных фильмах
    const necessaryMovie = savedBeatMovies.find((savedMovie) => (savedMovie.movieId === movie.id || savedMovie.movieId === movie.movieId));
    if (necessaryMovie) {
      api.deleteSavedMovie(necessaryMovie._id)
        .then(() => {
          handleGetSavedMovies();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // Отправка формы в компоненте Register
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

  // Получим информацию о текущем пользователе
  const getInfoUser = () => {
    api.getInfoUser()
    .then((userInfoObject) => {
      setLogIn(true); //?
      setCurrentUser(userInfoObject);
    })
    .catch((err) => {
      setLogIn(false); //?
      console.log(err);
    });
  };

  // Отправка формы в компоненте Login
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

  // Отправка формы в компоненте Profile
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

  // Выход из профиля
  const handleProfileExit = () => {
    api.exitUserProfile()
    .then(() => {
      history.push('/');
      setBeatMovies(null);
      setSavedBeatMovies(null);
      setInputState('');
      setCheckboxState(false);
      setInputSavedState('');
      setCheckSavedboxState(false);
      localStorage.removeItem('beatMovies');
      localStorage.removeItem('inputState');
      localStorage.removeItem('checkboxState');
      setCurrentUser([]);
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
              isPreloaderActive={isPreloaderActive}
              isGetError={isGetError}
              saveMovie={saveMovie}
              deleteMovie={deleteMovie}
              logIn={logIn}
              filteredMovies={filteredMovies}
              handleInputState={handleInputState}
              handleCheckboxState={handleCheckboxState}
              handlePreloader={handlePreloader}
              savedBeatMovies={savedBeatMovies}
          />
          <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              isPreloaderActive={isPreloaderActive}
              saveMovie={saveMovie}
              deleteMovie={deleteMovie}
              logIn={logIn}
              savedBeatMovies={savedBeatMovies}
              filteredSavedMovies={filteredSavedMovies}
              handleInputSavedState={handleInputSavedState}
              handleCheckboxSavedState={handleCheckboxSavedState}
              inputSavedState={inputSavedState}
              checkboxSavedState={checkboxSavedState}
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
