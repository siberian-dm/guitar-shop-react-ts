import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState
} from 'react';
import { DEBOUNCE_DELAY } from '../../../../../const';
import { setSearchedString } from '../../../../../store/reducers/search-slice/search-slice';
import { useDispatch } from 'react-redux';

type TProps = {
  setInputElement: (inputElement: HTMLInputElement | null) => void;
  onInputFocus: () => void;
  onInputBlur: () => void;
}

function SearchForm({ setInputElement, onInputFocus, onInputBlur }: TProps): JSX.Element {
  const [value, setValue] = useState('');
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setInputElement(searchInputRef.current);
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(
      () => dispatch(setSearchedString(value.trim())),
      DEBOUNCE_DELAY,
    );

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, value]);


  const onSearchInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const onFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
  };

  return (
    <form className="form-search__form" onSubmit={onFormSubmit}>
      <button className="form-search__submit" type="submit">
        <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
          <use xlinkHref="#icon-search"></use>
        </svg>
        <span className="visually-hidden">Начать поиск</span>
      </button>
      <input
        ref={searchInputRef}
        className="form-search__input"
        id="search"
        type="text"
        autoComplete="off"
        placeholder="что вы ищите?"
        onChange={onSearchInputChange}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        value={value}
      />
      <label className="visually-hidden" htmlFor="search">Поиск</label>
    </form>
  );
}

export default SearchForm;
