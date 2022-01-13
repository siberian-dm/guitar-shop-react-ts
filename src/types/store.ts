import { rootReducer } from '../store/reducers/root-reducer';
import { TGuitarCards, TSearchedGuitars } from './app-data';

export enum ReducerName {
  Catalog = 'catalog',
  SearchForm = 'searchForm',
}

export enum FetchState {
  Idle = 'idle',
  Pending = 'pending',
}

export type TCatalogDataState = {
  guitarsCards: [] | TGuitarCards;
  fetchState: FetchState;
  priceMinLimit: number;
  priceMaxLimit: number;
  currentPageNumber: number;
  cardTotalCount: number;
}

export type TSearchFormDataState = {
  searchedGuitars: [] | TSearchedGuitars;
}

export type TRootState = ReturnType<typeof rootReducer>;
