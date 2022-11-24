import './Promo.css';
import imageMain from '../../images/promo-image-zigzag.png';

function Promo() {
  return (
    <section className="promo">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <img className="promo__image" src={imageMain} alt="Зигзаги." />
    </section>
  );
}

export default Promo;
