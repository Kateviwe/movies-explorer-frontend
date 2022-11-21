import './Login.css';
import { Link } from 'react-router-dom';
import logoLogin from '../../images/header_logo.svg';

function Login() {
  return (
    <section className="login">
        <form className="formLogin" noValidate>
            <Link to="/">
                <img className="formLogin__logo" src={logoLogin} alt="Логотип округлой формы." />
            </Link>
            <h2 className="formLogin__greeting">Рады видеть!</h2>
            <fieldset className="formLogin__fieldset">
                <legend className="formLogin__legend">E-mail</legend>
                <input
                    className="formLogin__input"
                    type="email"
                    required
                />
                <span className="formLogin__span">Что-то пошло не так...</span>
                <legend className="formLogin__legend">Пароль</legend>
                <input
                    className="formLogin__input"
                    type="password"
                    required
                />
                <span className="formLogin__span">Что-то пошло не так...</span>
            </fieldset>
            <button className="formLogin__button" type="submit">Войти</button>
            <h3 className="formLogin__text">Ещё не зарегистрированы?
                <Link to="/signup" className="formLogin__link"> Регистрация</Link>
            </h3>
        </form>
    </section>
  );
}

export default Login;
