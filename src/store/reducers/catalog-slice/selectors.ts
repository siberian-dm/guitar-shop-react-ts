import { AppRoute, CATALOG_PAGE_SIZE } from '../../../const';
import { createSelector } from 'reselect';
import { ReducerName, TRootState } from '../../../types/store';

export const getGuitarsCards = (state: TRootState) => state[ReducerName.Catalog].guitarsCards;

export const getPriceMinLimit = (state: TRootState) => state[ReducerName.Catalog].priceMinLimit;

export const getPriceMaxLimit = (state: TRootState) => state[ReducerName.Catalog].priceMaxLimit;

export const getFetchState = (state: TRootState) => state[ReducerName.Catalog].fetchState;

export const getCurrentPageNumber = (state: TRootState) => state[ReducerName.Catalog].currentPageNumber;

export const getCardTotalCount = (state: TRootState) => state[ReducerName.Catalog].cardTotalCount;

export const getPageCount = createSelector(
  getCardTotalCount,
  (cardTotalCount) => Math.ceil(cardTotalCount / CATALOG_PAGE_SIZE),
);

export const getPageNumbers = createSelector(
  getPageCount,
  (pageCount) => {
    if (pageCount === 0) {
      return [];
    }
    return new Array(pageCount).fill(null).map((_val, index) => index + 1);
  },
);

export const getCatalogRouteWithCurrentPage = createSelector(
  getCurrentPageNumber,
  (page) => `${AppRoute.CatalogPage}${page}`,
);
