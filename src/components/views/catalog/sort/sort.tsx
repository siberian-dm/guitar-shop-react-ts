import classNames from 'classnames';
import useQuery from '../../../../hooks/use-query';
import {
  AppRoute,
  QueryField,
  SortOrder,
  SortType
} from '../../../../const';
import { useHistory } from 'react-router-dom';

function Sort(): JSX.Element {
  const query = useQuery();
  const activeSortType = query.get(QueryField.Sort);
  const activeSortOrder = query.get(QueryField.Order);

  const history = useHistory();

  const applyQueryParams = (): void => {
    if (query.get(QueryField.Sort) === null) {
      query.set(QueryField.Sort, SortType.Price);
    }

    if (query.get(QueryField.Order) === null) {
      query.set(QueryField.Order, SortOrder.Ascending);
    }

    history.push(`${AppRoute.Catalog}?${query}`);
  };

  const onSortButtonClick = (sortType: SortType) => (): void => {
    query.set(QueryField.Sort, sortType);
    applyQueryParams();
  };

  const onOrderButtonClick = (sortOrder: SortOrder) => (): void => {
    query.set(QueryField.Order, sortOrder);
    applyQueryParams();
  };

  const sortByPriceButtonClass = classNames(
    'catalog-sort__type-button',
    {
      'catalog-sort__type-button--active': activeSortType === SortType.Price,
    });

  const sortByRatingButtonClass = classNames(
    'catalog-sort__type-button',
    {
      'catalog-sort__type-button--active': activeSortType === SortType.Rating,
    });

  const orderUpButtonClass = classNames(
    'catalog-sort__order-button catalog-sort__order-button--up',
    {
      'catalog-sort__order-button--active': activeSortOrder === SortOrder.Ascending,
    });

  const orderDownButtonClass = classNames(
    'catalog-sort__order-button catalog-sort__order-button--down',
    {
      'catalog-sort__order-button--active': activeSortOrder === SortOrder.Descending,
    });

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={sortByPriceButtonClass}
          aria-label="по цене"
          tabIndex={-1}
          onClick={onSortButtonClick(SortType.Price)}
        >
          по цене
        </button>
        <button
          className={sortByRatingButtonClass}
          aria-label="по популярности"
          onClick={onSortButtonClick(SortType.Rating)}
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={orderUpButtonClass}
          aria-label="По возрастанию"
          tabIndex={-1}
          onClick={onOrderButtonClick(SortOrder.Ascending)}
        />
        <button
          className={orderDownButtonClass}
          aria-label="По убыванию"
          onClick={onOrderButtonClick(SortOrder.Descending)}
        />
      </div>
    </div>
  );
}

export default Sort;
