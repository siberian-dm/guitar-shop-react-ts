import { ReducerName, TRootState } from '../../../types/store';

export const getGuitarsCards = (state: TRootState) => state[ReducerName.App].guitarsCards;

export const getFetchState = (state: TRootState) => state[ReducerName.App].fetchState;
