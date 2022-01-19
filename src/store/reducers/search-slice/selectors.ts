import { createSelector } from 'reselect';
import { normalizeSearchResult } from '../../../utils/normalize-search-result';
import { ReducerName, TRootState } from '../../../types/store';

export const getSearchedGuitars = (state: TRootState) => state[ReducerName.Search].searchedGuitars;

export const getSearchString = (state: TRootState) => state[ReducerName.Search].searchString;

export const getNormalizedSearchResult = createSelector(
  getSearchedGuitars,
  getSearchString,
  (searchedGuitars, searchString) => normalizeSearchResult(searchedGuitars, searchString),
);
