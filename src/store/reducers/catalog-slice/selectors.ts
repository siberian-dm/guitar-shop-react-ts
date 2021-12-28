import { ReducerName, TRootState } from '../../../types/store';

export const getGuitarsCards = (state: TRootState) => state[ReducerName.Catalog].guitarsCards;

export const getPriceMinLimit = (state: TRootState) => state[ReducerName.Catalog].priceMinLimit;

export const getPriceMaxLimit = (state: TRootState) => state[ReducerName.Catalog].priceMaxLimit;

export const getFetchState = (state: TRootState) => state[ReducerName.Catalog].fetchState;
