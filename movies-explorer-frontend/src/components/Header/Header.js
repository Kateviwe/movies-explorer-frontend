import './Header.css';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import logoHeader from '../../images/header_logo.png';

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logoHeader} alt="Логотип округлой формы." />
      </Link>
      <Navigation />
    </header>
  );
}

export default Header;
