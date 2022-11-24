import './AboutMe.css';
import Portfolio from '../Portfolio/Portfolio';
import imageAboutMe from '../../images/aboutMe_student-photo.jpg';

function AboutMe() {
  return (
    <section className="aboutMe">
      <h2 className="aboutMe__title">Студент</h2>
      <div className="aboutMe__student-info">
        <div className="aboutMe__wrapper">
          <h3 className="aboutMe__name">Екатерина</h3>
          <h4 className="aboutMe__about">Фронтенд-разработчик, 24 года</h4>
          <h5 className="aboutMe__description">
            По образованию я инженер-робототехник. Из всего спектра задач в робототехнике мне интереснее 
            всего программирование. На данный момент активно развиваюсь в этом направлении, изучая frontend-разработку.
            Мои хобби: настольный теннис, настольные игры.
          </h5>
          <ul className="aboutMe__list-links">
            <li className="aboutMe__item-link">
              <a className="aboutMe__link" href="https://github.com/Kateviwe" target="_blank" rel="noreferrer">Github</a>
            </li>
          </ul>
        </div>
        <img className="aboutMe__student-photo" src={imageAboutMe} alt="Студент Екатерина." />
      </div>
      <Portfolio />
    </section>
  );
}

export default AboutMe;
