import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
        <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
        <div className="footer__wrapper">
            <p className="footer__signature">© 2022</p>
            <ul className="footer__list-links">
                <li className="footer__item-link">
                    <a className="footer__item-href" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
                </li>
                <li className="footer__item-link">
                    <a className="footer__item-href" href="https://github.com/Kateviwe" target="_blank" rel="noreferrer">Github</a>
                </li>
            </ul>
        </div>
    </footer>
  );
}

export default Footer;
