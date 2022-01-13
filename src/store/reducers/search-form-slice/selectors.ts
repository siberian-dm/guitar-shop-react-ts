import { ReducerName, TRootState } from '../../../types/store';

export const getSearchedGuitars = (state: TRootState) => state[ReducerName.SearchForm].searchedGuitars;
