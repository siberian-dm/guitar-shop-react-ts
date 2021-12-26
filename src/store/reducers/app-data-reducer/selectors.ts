import { createSelector } from 'reselect';
import { ReducerName, TRootState } from '../../../types/store';

export const getGuitarsCards = (state: TRootState) => state[ReducerName.App].guitarsCards;

export const getFetchState = (state: TRootState) => state[ReducerName.App].fetchState;

export const getPriceRange = createSelector(
  getGuitarsCards,
  (guitars) => {
    if (guitars.length === 0) {
      return {min: 0, max: 0};
    }
    const prices = guitars.map(({price}) => price);

    const min = Math.min(...prices);
    const max = Math.max(...prices);

    return {min, max};
  },
);
