import './AboutProject.css';

function AboutProject() {
  return (
    <section className="aboutProject">
        <h2 className="aboutProject__title">О проекте</h2>
        <ul className="aboutProject__text-list">
            <li className="aboutProject__text-item">
                <h3 className="aboutProject__header">Дипломный проект включал 5 этапов</h3>
                <p className="aboutProject__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            </li>
            <li className="aboutProject__text-item">
                <h3 className="aboutProject__header">На выполнение диплома ушло 5 недель</h3>
                <p className="aboutProject__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </li>
        </ul>
        <ul className="aboutProject__diagram-list">
            <li className="aboutProject__diagram-item-backend">
                <div className="aboutProject__line-backend">1 неделя</div>
                <p className="aboutProject__caption">Back-end</p>
            </li>
            <li className="aboutProject__diagram-item-frontend">
                <div className="aboutProject__line-frontend">4 недели</div>
                <p className="aboutProject__caption">Front-end</p>
            </li>
        </ul>
    </section>
  );
}

export default AboutProject;
