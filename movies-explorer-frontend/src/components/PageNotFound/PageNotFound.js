import './PageNotFound.css';
import { useHistory } from 'react-router-dom';

function PageNotFound() {

  const history = useHistory();

  const handleGoBackClick = () => {
    history.goBack();
  };

  return (
    <section className="pageNotFound">
        <h2 className="pageNotFound__error-code">404</h2>
        <p className="pageNotFound__error-name">Страница не найдена</p>
        <button className="pageNotFound__link-back" type="button" onClick={handleGoBackClick}>Назад</button>
    </section>
  );
}

export default PageNotFound;
