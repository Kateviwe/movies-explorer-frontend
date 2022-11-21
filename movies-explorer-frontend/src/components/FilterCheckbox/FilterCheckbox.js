import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <div className="filterCheckbox">
        <label htmlFor="checkbox-id" className="filterCheckbox__label">
            {/* Исходную стилизацию чекбокса скроем в css */}
            <input
                id="checkbox-id"
                className="filterCheckbox__input"
                type="checkbox"
                name="filterCheckbox"
                value="Короткометражки"
            />
            {/* Стилизируем чекбокс так как хотим*/}
            <div className="filterCheckbox__span"></div>
            Короткометражки
        </label>
    </div>
  );
}

export default FilterCheckbox;
