import React from 'react';
import './Profile.css';

const isProfileFormValid = true;

function Profile() {

const [isEditButtonPressed, setIsEditButtonPressed] = React.useState(false);

  function handleEditButtonClick () {
    setIsEditButtonPressed(true);
  }

  return (
    <section className="profile">
        <form className="formProfile">
            <h2 className="formProfile__greeting">Привет, Виталий!</h2>
            <ul className="formProfile__list">
                <li className="formProfile__item">
                    <p className="formProfile__header">Имя</p>
                    <input
                        className="formProfile__input"
                        placeholder="Виталий"
                        type="text"
                        required
                    />
                </li>
                <li className="formProfile__item">
                    <p className="formProfile__header">E-mail</p>
                    <input
                        className="formProfile__input"
                        placeholder="pochta@yandex.ru"
                        type="email"
                        required
                    />
                </li>
            </ul>
            <span className="formProfile__span">При обновлении профиля произошла ошибка.</span>
            <button className={`formProfile__button formProfile__button_type_edit ${isEditButtonPressed ? "formProfile__button_inactive" : ""}`} type="button" onClick={handleEditButtonClick}>Редактировать</button>
            <button className={`formProfile__button ${isEditButtonPressed ? "formProfile__button_inactive" : ""}`} type="button">Выйти из аккаунта</button>
            <button
                className={`
                    formProfile__button
                    formProfile__button_type_save
                    ${!isEditButtonPressed ? "formProfile__button_inactive" : ""}
                    ${!isProfileFormValid ? "formProfile__button_disabled" : ""}
                `}
                type="submit"
                disabled={!isProfileFormValid}
            >Сохранить</button>
        </form>
    </section>
  );
}

export default Profile;
