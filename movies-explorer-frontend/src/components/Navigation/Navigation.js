import './Navigation.css';
import MobileMenu from '../MobileMenu/MobileMenu';
import { Link, NavLink } from 'react-router-dom';

function Navigation({loggedIn, isMobileMenuOpened}) {
  return (
    <>
      {loggedIn ?
        <nav className="navigationLoggedIn">
          <ul className="navigationLoggedIn__list">
            <li>
              <NavLink to="/movies" className="navigationLoggedIn__item" activeClassName="navigationLoggedIn__item_active">Фильмы</NavLink>
            </li>
            <li>
              <NavLink to="/saved-movies" className="navigationLoggedIn__item" activeClassName="navigationLoggedIn__item_active">Сохранённые фильмы</NavLink>
            </li>
          </ul>
          <Link to="/profile" className="navigationLoggedIn__profile">Аккаунт</Link>
          <button className="navigationLoggedIn__button" type="button"></button>
          <MobileMenu isMobileMenuOpened={isMobileMenuOpened} />
        </nav>
      :
        <nav className="navigation">
          <ul className="navigation__list">
            <li>
              <Link to="/signup" className="navigation__item navigation__item_registrate">Регистрация</Link>
            </li>
            <li>
              <Link to="/signin" className="navigation__item navigation__item_sign-in">Войти</Link>
            </li>
          </ul>
        </nav>
      }
    </>
  );
}

export default Navigation;
