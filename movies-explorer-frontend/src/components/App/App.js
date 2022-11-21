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


const headerArray = ["/", "/movies", "/saved-movies", "/profile"];
const footerArray = ["/", "/movies", "/saved-movies"];

const loggedIn = true;
const isMobileMenuOpened = false;

function App() {
  return (
    <div className="app">
      <Route exact path={headerArray}>
        <Header loggedIn={loggedIn} isMobileMenuOpened={isMobileMenuOpened} />
      </Route>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/movies">
          <Movies />
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
