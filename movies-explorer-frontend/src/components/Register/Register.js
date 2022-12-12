import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import logoRegister from '../../images/header_logo.svg';

function Register({
    handleRegisterFormSubmit,
    registeredIn,
    handleLoadRegister,
    isFirstLoadRegister,
    errorRegister
}) {

    const { values, textErrors, isValid, handleChange, resetForm } = useFormWithValidation();
    const regExpEmail = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';

    React.useEffect(() => {
        resetForm();
        handleLoadRegister(true);
    }, []);
    
    const onSubmit = (evt) => {
        evt.preventDefault();
        handleRegisterFormSubmit(values.name, values.email, values.password);
    };

    return (
        <section className="register">
            <form className="form" noValidate onSubmit={onSubmit}>
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
                        name="name"
                        value={values.name || ""}
                        onChange={handleChange}
                    />
                    <span className={`form__span ${!isValid.name && 'form__span_visible'}`}>{textErrors.name}</span>
                    <legend className="form__legend">E-mail</legend>
                    <input
                        className="form__input"
                        type="email"
                        required
                        name="email"
                        value={values.email || ""}
                        onChange={handleChange}
                        pattern={regExpEmail}
                    />
                    <span className={`form__span ${!isValid.email && 'form__span_visible'}`}>{textErrors.email}</span>
                    <legend className="form__legend">Пароль</legend>
                    <input
                        className="form__input"
                        type="password"
                        required
                        minLength="3"
                        name="password"
                        value={values.password || ""}
                        onChange={handleChange}
                    />
                    <span className={`form__span ${!isValid.password && 'form__span_visible'}`}>{textErrors.password}</span>
                </fieldset>
                <p className={`form__error ${(!registeredIn && !isFirstLoadRegister) ? "form__error_visible" : ""}`}>
                    {errorRegister === 409 ? "Пользователь с таким email уже существует." : "При регистрации пользователя произошла ошибка."}
                </p>
                <button className={`form__button ${!isValid ? "form__button_disabled" : ""}`} disabled={!isValid} type="submit">Зарегистрироваться</button>
                <h3 className="form__text">Уже зарегистрированы?
                    <Link to="/signin" className="form__link"> Войти</Link>
                </h3>
            </form>
        </section>
    );
}

export default Register;
