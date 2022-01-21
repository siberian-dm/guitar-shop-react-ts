import classNames from 'classnames';
import styles from './searched-item-list.module.css';
import { AppRoute, BtnKey } from '../../../../../const';
import { fetchGuitarsByName } from '../../../../../store/api-action';
import { getNormalizedSearchResult, getSearchString } from '../../../../../store/reducers/search-slice/selectors';
import { KeyboardEvent, useEffect, useRef } from 'react';
import { resetSearchState } from '../../../../../store/reducers/search-slice/search-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export type TProps = {
  setUListElement: (uListElement: HTMLUListElement | null) => void;
  isItemListShow: boolean;
}

function SearchedItemList({
  setUListElement,
  isItemListShow,
}: TProps): JSX.Element {
  const itemListRef = useRef<HTMLUListElement | null>(null);
  const listItemRefs = useRef<{id: number, listItem: HTMLLIElement | null}[]>([]);
  const searchString = useSelector(getSearchString);
  const listItems = useSelector(getNormalizedSearchResult);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setUListElement(itemListRef.current);
  });

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

  const onListItemKeyDown = (id: number, itemIndex: number) =>
    (evt: KeyboardEvent) => {
      const maxIndex = listItemRefs.current.length - 1;
      const indexDown = itemIndex < maxIndex ? itemIndex + 1 : itemIndex;
      const indexUp = itemIndex > 0 ? itemIndex - 1 : itemIndex;

      switch (evt.key) {
        case BtnKey.Enter:
          evt.preventDefault();
          history.push(`${AppRoute.Product}/${id}`);
          break;
        case BtnKey.ArrowDown:
          evt.preventDefault();
          listItemRefs.current[indexDown].listItem?.focus();
          break;
        case BtnKey.ArrowUp:
          evt.preventDefault();
          listItemRefs.current[indexUp].listItem?.focus();
          break;
      }
    };

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
      ref={itemListRef}
      className={selectListClass}
      style={{padding: '2px 5px 5px 8px'}}
    >
      {listItems.length !== 0 && listItems
        .map(({ name, id }, index) => (
          <li
            ref={(listItem) => listItemRefs.current[index] = {id, listItem}}
            key={id}
            style={{padding: '4px 10px 4px 30px'}}
            className="form-search__select-item"
            tabIndex={0}
            onClick={onListItemClick(id)}
            onKeyDown={onListItemKeyDown(id, index)}
          >
            {name}
          </li>
        ))}
    </ul>
  );
}

export default SearchedItemList;
