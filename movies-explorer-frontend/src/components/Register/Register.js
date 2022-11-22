import './Register.css';
import { Link } from 'react-router-dom';
import logoRegister from '../../images/header_logo.svg';

function Register() {
  return (
    <section className="register">
        <form className="form">
            <Link to="/">
                <img className="form__logo" src={logoRegister} alt="Логотип округлой формы." />
            </Link>
            <h2 className="form__greeting">Добро пожаловать!</h2>
            <fieldset className="form__fieldset">
                <legend className="form__legend">Имя</legend>
                <input
                    className="form__input"
                    type="text"
                    required
                />
                <span className="form__span">Что-то пошло не так...</span>
                <legend className="form__legend">E-mail</legend>
                <input
                    className="form__input"
                    type="email"
                    required
                />
                <span className="form__span">Что-то пошло не так...</span>
                <legend className="form__legend">Пароль</legend>
                <input
                    className="form__input"
                    type="password"
                    required
                    minLength="3"
                />
                <span className="form__span">Что-то пошло не так...</span>
            </fieldset>
            <button className="form__button" type="submit">Зарегистрироваться</button>
            <h3 className="form__text">Уже зарегистрированы?
                <Link to="/signin" className="form__link"> Войти</Link>
            </h3>
        </form>
    </section>
  );
}

export default Register;
