import React from 'react';
import './Header.css';
import { Link, useRouteMatch } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import logoHeader from '../../images/header_logo.svg';

function Header({
  loggedIn,
  getInfoUser
}) {

  const matchMovies = useRouteMatch("/movies");
  const matchSavedMovies = useRouteMatch("/saved-movies");
  const matchProfile = useRouteMatch("/profile");

  React.useEffect(() => {
     getInfoUser();
  }, []);

  return (
    <header className={`header ${(matchMovies || matchSavedMovies || matchProfile) ? "header_loggedIn" : ""}`}>
      <Link to="/">
        <img className="header__logo" src={logoHeader} alt="Логотип округлой формы." />
      </Link>
      <Navigation loggedIn={loggedIn} />
    </header>
  );
}

export default Header;
