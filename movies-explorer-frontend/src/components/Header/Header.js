import './Header.css';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import logoHeader from '../../images/header_logo.svg';

function Header({loggedIn, isMobileMenuOpened}) {
  return (
    <header className={`header ${loggedIn ? "header_loggedIn" : ""}`}>
      <Link to="/">
        <img className="header__logo" src={logoHeader} alt="Логотип округлой формы." />
      </Link>
      <Navigation loggedIn={loggedIn} isMobileMenuOpened={isMobileMenuOpened} />
    </header>
  );
}

export default Header;
