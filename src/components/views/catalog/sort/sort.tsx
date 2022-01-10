import classNames from 'classnames';
import { QueryField, SortOrder, SortType } from '../../../../const';
import { StringParam, useQueryParam } from 'use-query-params';

function Sort(): JSX.Element {
  const [activeSortType, setActiveSortType] = useQueryParam(QueryField.Sort, StringParam);
  const [activeSortOrder, setActiveSortOrder] = useQueryParam(QueryField.Order, StringParam);

  const onSortButtonClick = (sortType: SortType) => (): void => {
    setActiveSortType(sortType);

    if (!activeSortOrder) {
      setActiveSortOrder(SortOrder.Ascending);
    }
  };

  const onOrderButtonClick = (sortOrder: SortOrder) => (): void => {
    setActiveSortOrder(sortOrder);

    if (!activeSortType) {
      setActiveSortType(SortType.Price);
    }
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
