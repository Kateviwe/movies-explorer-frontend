import './PageNotFound.css';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <section className="pageNotFound">
        <h2 className="pageNotFound__error-code">404</h2>
        <p className="pageNotFound__error-name">Страница не найдена</p>
        <Link to="/" className="pageNotFound__link-back">Назад</Link>
    </section>
  );
}

export default PageNotFound;
