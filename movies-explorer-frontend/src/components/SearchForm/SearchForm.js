import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <div className="searchForm">
        <form className="searchForm__form" name="searchForm">
            <fieldset className="searchForm__fieldset">
                <input
                    id="searchFilm-input"
                    className="searchForm__input"
                    type="text"
                    name="searchFilm"
                    placeholder="Фильм"
                    required
                />
            </fieldset>
            <button className="searchForm__find-button" type="submit">Найти</button>
        </form>
        <FilterCheckbox />
    </div>
  );
}

export default SearchForm;
