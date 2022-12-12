import React from 'react';
import './Profile.css';
// Импорт объекта контекста
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function Profile({
    handleProfileFormSubmit,
    isProfileEditSuccess,
    handlePopupEdit,
    getInfoUser,
    isProfileErrUp,
    handleErrUp,
    errorProfile,
    onClickExitProfile
}) {

    const currentUserInfoContext = React.useContext(CurrentUserContext);
    const { values, textErrors, isValid, handleChange, resetForm } = useFormWithValidation();
    const [isEditButtonPressed, setIsEditButtonPressed] = React.useState(false);
    const regExpEmail = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';

    // Активная/неактивная кнопка "Сохранить"
    const buttonSaveState = (!isValid || (currentUserInfoContext.name === values.name && currentUserInfoContext.email === values.email));

    React.useEffect(() => {
        resetForm(currentUserInfoContext);
    }, [resetForm, currentUserInfoContext])
    
    React.useEffect(() => {
        getInfoUser();
        handleErrUp(false);
    }, []);
    
    function handleEditButtonClick() {
        setIsEditButtonPressed(true);
    }

    function onSubmit(evt) {
        evt.preventDefault();
        handleProfileFormSubmit(values.name, values.email);
    }

    function onClose() {
        handlePopupEdit(false);
        setIsEditButtonPressed(false);
    }

    return (
        <section className="profile">
            <form className="formProfile" noValidate onSubmit={onSubmit}>
                <h2 className="formProfile__greeting">{`Привет, ${currentUserInfoContext.name}!`}</h2>
                <ul className="formProfile__list">
                    <li className="formProfile__item">
                        <div className="formProfile__wrapper">
                            <p className="formProfile__header">Имя</p>
                            <input
                                className={`formProfile__input ${!isEditButtonPressed && 'formProfile__input_disabled'}`}
                                type="text"
                                required
                                name="name"
                                value={values.name || currentUserInfoContext.name}
                                onChange={handleChange}
                                disabled={!isEditButtonPressed}
                            />
                        </div>
                        <span className={`formProfile__span ${!isValid.name && 'formProfile__span_visible'}`}>{textErrors.name}</span>
                    </li>
                    <li className="formProfile__item">
                        <div className="formProfile__wrapper">
                            <p className="formProfile__header">E-mail</p>
                            <input
                                className={`formProfile__input ${!isEditButtonPressed && 'formProfile__input_disabled'}`}
                                type="email"
                                required
                                name="email"
                                value={values.email || currentUserInfoContext.email}
                                onChange={handleChange}
                                disabled={!isEditButtonPressed}
                                pattern={regExpEmail}
                            />
                        </div>
                        <span className={`formProfile__span ${!isValid.email && 'formProfile__span_visible'}`}>{textErrors.email}</span>
                    </li>
                </ul>
                <span className={`formProfile__message ${isProfileErrUp ? "formProfile__message_visible" : ""}`}>
                    {errorProfile === 409 ? "Пользователь с таким email уже существует." : "При обновлении профиля произошла ошибка."}
                </span>
                <button className={`formProfile__button formProfile__button_type_edit ${isEditButtonPressed ? "formProfile__button_inactive" : ""}`} type="button" onClick={handleEditButtonClick}>Редактировать</button>
                <button className={`formProfile__button ${isEditButtonPressed ? "formProfile__button_inactive" : ""}`} onClick={onClickExitProfile} type="button">Выйти из аккаунта</button>
                <div className={`formProfile__submitOk ${isProfileEditSuccess ? "formProfile__submitOk_opened" : ""}`}>
                    <p className="formProfile__submit-text">Данные обновлены успешно</p>
                    <button className="formProfile__submit-exit" onClick={onClose} type="button">Закрыть</button>
                </div>
                <button
                    className={`
                        formProfile__button
                        formProfile__button_type_save
                        ${!isEditButtonPressed ? "formProfile__button_inactive" : ""}
                        ${buttonSaveState ? "formProfile__button_disabled" : ""}
                    `}
                    type="submit"
                    disabled={buttonSaveState}
                >Сохранить</button>
            </form>
        </section>
    );
}

export default Profile;
