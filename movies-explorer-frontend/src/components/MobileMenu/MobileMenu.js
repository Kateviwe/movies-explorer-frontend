import './MobileMenu.css';
import { Link, NavLink } from 'react-router-dom';

function MobileMenu({isMobileMenuOpened}) {
  return (
    <>
      <div className={`mobileMenu ${isMobileMenuOpened ? "mobileMenu_active" : ""}`}>
          <button className="mobileMenu__button" type="button"></button>
          <ul className="mobileMenu__list">
              <li>
                <NavLink exact to="/" className="mobileMenu__item" activeClassName="mobileMenu__item_active">Главная</NavLink>
              </li>
              <li>
                <NavLink to="/movies" className="mobileMenu__item" activeClassName="mobileMenu__item_active">Фильмы</NavLink>
              </li>
              <li>
                <NavLink to="/saved-movies" className="mobileMenu__item" activeClassName="mobileMenu__item_active">Сохранённые фильмы</NavLink>
              </li>
            </ul>
            <Link to="/profile" className="mobileMenu__profile">Аккаунт</Link>
      </div>
      <div className={`mobileMenu__overlay ${isMobileMenuOpened ? "mobileMenu__overlay_active" : ""}`}></div>
    </>
  );
}

export default MobileMenu;
