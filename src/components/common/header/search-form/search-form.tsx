import classNames from 'classnames';
import styles from './search-form.module.css';
import { AppRoute, DEBOUNCE_DELAY } from '../../../../const';
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState
} from 'react';
import { fetchGuitarsByName } from '../../../../store/api-action';
import { getSearchedGuitars } from '../../../../store/reducers/search-form-slice/selectors';
import { resetSearchFormState } from '../../../../store/reducers/search-form-slice/search-form-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { normalizeSearchResult } from '../../../../utils/normalize-search-result';

function SearchForm(): JSX.Element {
  const [value, setValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  const searchedGuitars = useSelector(getSearchedGuitars);

  const filteredAndSortedGuitars = normalizeSearchResult(searchedGuitars, debouncedValue);

  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value.trim()), DEBOUNCE_DELAY);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  useEffect(() => {
    if (debouncedValue.length !== 0) {
      dispatch(fetchGuitarsByName(debouncedValue));
    }
    else {
      dispatch(resetSearchFormState());
    }
    return () => {
      dispatch(resetSearchFormState());
    };
  },
  [debouncedValue, dispatch]);

  const onSearchInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const onSelectItemClick = (id: number) => () => {
    history.push(`${AppRoute.Product}/${id}`);
  };

  const onFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
  };

  const selectListClass = classNames(
    'form-search__select-list',
    {
      'hidden': filteredAndSortedGuitars.length === 0,
      [`${styles['list-opened']} list-opened`]: filteredAndSortedGuitars.length !== 0,
    });

  return (
    <div className="form-search">
      <form className="form-search__form" onSubmit={onFormSubmit}>
        <button className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg>
          <span className="visually-hidden">Начать поиск</span>
        </button>
        <input
          className="form-search__input"
          id="search"
          type="text"
          autoComplete="off"
          placeholder="что вы ищите?"
          onChange={onSearchInputChange}
          value={value}
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      <ul className={selectListClass}>
        {filteredAndSortedGuitars.length !== 0 && filteredAndSortedGuitars
          .map(({ name, id }) => (
            <li
              key={id}
              className="form-search__select-item"
              tabIndex={0}
              onClick={onSelectItemClick(id)}
            >
              {name}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default SearchForm;
