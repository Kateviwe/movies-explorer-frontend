import './Navigation.css';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="navigation">
        <ul className="navigation__list">
          <li className="navigation__item navigation__item_registrate">
            <Link to="/signup">Регистрация</Link>
          </li>
          <li className="navigation__item navigation__item_sign-in">
            <Link to="/signin">Войти</Link>
          </li>
        </ul>
    </nav>
  );
}

export default Navigation;
