import classNames from 'classnames';
import styles from './searched-item-list.module.css';
import { AppRoute } from '../../../../../const';
import { fetchGuitarsByName } from '../../../../../store/api-action';
import { getNormalizedSearchResult, getSearchString } from '../../../../../store/reducers/search-slice/selectors';
import { resetSearchState } from '../../../../../store/reducers/search-slice/search-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useKeyPress } from '../../../../../hooks/use-key-press';

type TProps = {
  setUListElement: (uListElement: HTMLUListElement | null) => void;
  isInputFocused: boolean;
  isItemListShow: boolean;
}

function SearchedItemList({
  setUListElement,
  isInputFocused,
  isItemListShow,
}: TProps): JSX.Element {
  const [cursorIndex, setCursorIndex] = useState<number | null>(null);
  const searchedItemListRef = useRef<HTMLUListElement | null>(null);
  const listItemRefs = useRef<{id: number, listItem: HTMLLIElement | null}[]>([]);
  const searchString = useSelector(getSearchString);
  const listItems = useSelector(getNormalizedSearchResult);

  const isDownKeyPress = useKeyPress('ArrowDown', isItemListShow);
  const isUpKeyPress = useKeyPress('ArrowUp', isItemListShow);
  const isEnterKeyPress = useKeyPress('Enter', isItemListShow);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const refObject = cursorIndex !== null
      ? listItemRefs.current[cursorIndex]
      : null;

    refObject?.listItem?.focus();
  },
  [cursorIndex]);

  useEffect(() => {
    setUListElement(searchedItemListRef.current);
  });

  useEffect(() => {
    if (isInputFocused) {
      setCursorIndex(null);
    }
  },
  [isInputFocused]);

  useEffect(() => {
    if (searchString.length !== 0) {
      dispatch(fetchGuitarsByName(searchString));
    }
    else {
      dispatch(resetSearchState());
    }
    return () => {
      dispatch(resetSearchState());
    };
  },
  [searchString, dispatch]);

  useEffect(() => {
    if (listItems.length && isDownKeyPress) {
      setCursorIndex((prev) => {
        if (prev === null) {
          return 0;
        }

        return prev < listItems.length - 1 ? prev + 1 : prev;
      });
    }
  }, [isDownKeyPress, listItems.length]);

  useEffect(() => {
    if (listItems.length && isUpKeyPress) {
      setCursorIndex((prev) => {
        if (prev === null) {
          return prev;
        }

        return prev > 0 ? prev - 1 : prev;
      });
    }
  }, [isUpKeyPress, listItems.length]);

  useEffect(() => {
    const refObject = cursorIndex !== null
      ? listItemRefs.current[cursorIndex]
      : null;

    if (isEnterKeyPress && refObject) {
      history.push(`${AppRoute.Product}/${refObject.id}`);
    }
  }, [cursorIndex, history, isEnterKeyPress]);

  const onListItemClick = (id: number) => () => {
    history.push(`${AppRoute.Product}/${id}`);
  };

  const selectListClass = classNames(
    'form-search__select-list',
    {
      'hidden': listItems.length === 0 || !isItemListShow,
      [`${styles['list-opened']} list-opened`]: listItems.length !== 0 && isItemListShow,
    });

  return (
    <ul
      ref={searchedItemListRef}
      className={selectListClass}
    >
      {listItems.length !== 0 && listItems
        .map(({ name, id }, index) => (
          <li
            ref={(listItem) => listItemRefs.current[index] = {id, listItem}}
            key={id}
            className="form-search__select-item"
            tabIndex={0}
            onClick={onListItemClick(id)}
          >
            {name}
          </li>
        ))}
    </ul>
  );
}

export default SearchedItemList;
