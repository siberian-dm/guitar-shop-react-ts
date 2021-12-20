import classNames from 'classnames';
import styles from './search-form.module.css';
import { ChangeEvent, useState } from 'react';
import { getGuitarsCards } from '../../../../store/reducers/app-data-reducer/selectors';
import { useSelector } from 'react-redux';

function SearchForm(): JSX.Element {
  const guitars = useSelector(getGuitarsCards);
  const [query, setQuery] = useState('');

  const searchedGuitars = query.length !== 0
    ?
    guitars.filter(
      ({ name }) => name.toLowerCase().includes(query.toLowerCase()),
    )
    : [];

  const onSearchInputChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    setQuery(evt.target.value);
  };

  const selectListClass = classNames(
    'form-search__select-list',
    {
      'hidden': searchedGuitars.length === 0,
      'list-opened': searchedGuitars.length !== 0,
      [styles['select-list']]: searchedGuitars.length !== 0,
    });

  return (
    <div className="form-search">
      <form className="form-search__form">
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
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      <ul className={selectListClass}>
        {searchedGuitars.length !== 0 && searchedGuitars
          .map(({ name, id }) => (
            <li
              key={id}
              className="form-search__select-item"
              tabIndex={0}
            >
              {name}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default SearchForm;
