import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import logoLogin from '../../images/header_logo.svg';

function Login({
    handleLoginFormSubmit,
    logIn,
    handleLoadLogin,
    isFirstLoadLogin
}) {

    const { values, textErrors, isValid, handleChange, resetForm } = useFormWithValidation();
    const regExpEmail = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
    
    React.useEffect(() => {
        resetForm();
        handleLoadLogin(true);
    }, []);

    const onSubmit = (evt) => {
        evt.preventDefault();
        handleLoginFormSubmit(values.email, values.password);
    };

    return (
        <section className="login">
            <form className="formLogin" noValidate onSubmit={onSubmit}>
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
                        name="email"
                        value={values.email || ""}
                        onChange={handleChange}
                        pattern={regExpEmail}
                    />
                    <span className={`formLogin__span ${!isValid.email && 'formLogin__span_visible'}`}>{textErrors.email}</span>
                    <legend className="formLogin__legend">Пароль</legend>
                    <input
                        className="formLogin__input"
                        type="password"
                        required
                        name="password"
                        value={values.password || ""}
                        onChange={handleChange}
                    />
                    <span className={`formLogin__span ${!isValid.password && 'formLogin__span_visible'}`}>{textErrors.password}</span>
                </fieldset>
                <p className={`formLogin__error ${(!logIn && !isFirstLoadLogin) ? "formLogin__error_visible" : ""}`}>
                    Вы ввели неправильный логин или пароль.
                </p>
                <button className={`formLogin__button ${!isValid ? "formLogin__button_disabled" : ""}`} disabled={!isValid} type="submit">Войти</button>
                <h3 className="formLogin__text">Ещё не зарегистрированы?
                    <Link to="/signup" className="formLogin__link"> Регистрация</Link>
                </h3>
            </form>
        </section>
    );
}

export default Login;
