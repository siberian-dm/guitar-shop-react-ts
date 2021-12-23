import classNames from 'classnames';
import useQuery from '../../../../hooks/use-query';
import { AppRoute, SortOrder, SortType } from '../../../../const';
import { useHistory } from 'react-router-dom';

function CatalogSort(): JSX.Element {
  const query = useQuery();
  const activeSortType = query.get('sort');
  const activeSortOrder = query.get('order');

  const history = useHistory();

  const applyQueryParams = (
    sortType: string | null,
    sortOrder: string | null,
  ): void => {
    history.push(
      `${AppRoute.Catalog}?sort=${sortType ?? SortType.Price}&order=${sortOrder ?? SortOrder.Ascending}`,
    );
  };

  const onSortButtonClick = (sortType: SortType) => (): void => {
    applyQueryParams(sortType, activeSortOrder);
  };

  const onOrderButtonClick = (sortOrder: SortOrder) => (): void => {
    applyQueryParams(activeSortType, sortOrder);
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

export default CatalogSort;
