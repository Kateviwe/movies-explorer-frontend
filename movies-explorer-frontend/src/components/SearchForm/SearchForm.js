import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <div className="searchForm">
        <div className="searchForm__wrapper">
            <form className="searchForm__form" name="searchForm" noValidate>
                <fieldset className="searchForm__fieldset">
                    <input
                        id="searchFilm-input"
                        className="searchForm__input"
                        type="text"
                        name="searchFilm"
                        placeholder="Фильм"
                    />
                </fieldset>
            </form>
            <button className="searchForm__find-button" type="button">Найти</button>
        </div>
        <FilterCheckbox />
    </div>
  );
}

export default SearchForm;
