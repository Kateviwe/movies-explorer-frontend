import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({
  isSavedMovies,
  isShort,
  handleIsShort,
  handleIsSavedShort,
  isSavedShort
}) {

  function onCheckbox(evt) {
    localStorage.setItem('checkboxState', evt.target.checked);
    handleIsShort(evt.target.checked);
  }

  function onSavedCheckbox(evt) {
    handleIsSavedShort(evt.target.checked);
  }

  return (
    <div className="filterCheckbox">
        <label htmlFor="checkbox-id" className="filterCheckbox__label">
            {/* Исходную стилизацию чекбокса скроем в css */}
            <input
                id="checkbox-id"
                className="filterCheckbox__input"
                type="checkbox"
                name="filterCheckbox"
                checked={!isSavedMovies ? isShort : isSavedShort}
                onChange={!isSavedMovies ? onCheckbox : onSavedCheckbox}
            />
            {/* Стилизируем чекбокс так как хотим*/}
            <div className="filterCheckbox__span"></div>
            Короткометражки
        </label>
    </div>
  );
}

export default React.memo(FilterCheckbox);
