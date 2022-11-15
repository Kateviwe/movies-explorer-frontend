import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
        <h3 className="portfolio__title">Портфолио</h3>
        <ul className="portfolio__list-projects">
            <li className="portfolio__item-project">
                <a className="portfolio__item-link" href="https://github.com/Kateviwe/how-to-learn" target="_blank" rel="noreferrer">Статичный сайт</a>
            </li>
            <li className="portfolio__item-project">
                <a className="portfolio__item-link" href="https://github.com/Kateviwe/russian-travel" target="_blank" rel="noreferrer">Адаптивный сайт</a>
            </li>
            <li className="portfolio__item-project">
                <a className="portfolio__item-link" href="https://github.com/Kateviwe/react-mesto-api-full" target="_blank" rel="noreferrer">Одностраничное приложение</a>
            </li>
        </ul>
    </section>
  );
}

export default Portfolio;
