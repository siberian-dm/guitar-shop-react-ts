import classNames from 'classnames';
import debounce from 'lodash.debounce';
import styles from './search-form.module.css';
import { APIRoute, createAPI } from '../../../../services/api';
import { AppRoute } from '../../../../const';
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState
} from 'react';
import { TGuitarCards } from '../../../../types/app-data';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const TIMEOUT_DELAY = 500;

const api = createAPI();

function SearchForm(): JSX.Element {
  const history = useHistory();
  const [guitars, setGuitars] = useState<TGuitarCards | []>([]);
  const [searchCriteria, setSearchCriteria] = useState('');

  const searchGuitars = async (criteria: string) => {
    try {
      const response = await api.get<TGuitarCards>(`${APIRoute.GuitarsSearch}${criteria}`);

      return response.data;
    }
    catch (error) {
      const errorMessage = (error as {message: string}).message;

      if (errorMessage) {
        toast.error(errorMessage);
      }
    }
  };

  const debouncedSearch = useRef(
    debounce(
      async (criteria: string) => {
        const data = await searchGuitars(criteria);
        setGuitars(data ?? []);
      },
      TIMEOUT_DELAY),
  ).current;

  useEffect(() => {
    if (searchCriteria.length !== 0) {
      debouncedSearch(searchCriteria);
    }
    else {
      setGuitars([]);
    }

    return () => {
      setGuitars([]);
      debouncedSearch.cancel();
    };
  }, [debouncedSearch, searchCriteria]);


  const onSearchInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchCriteria(evt.target.value);
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
      'hidden': guitars.length === 0,
      [`${styles['list-opened']} list-opened`]: guitars.length !== 0,
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
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      <ul className={selectListClass}>
        {guitars.length !== 0 && guitars
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
