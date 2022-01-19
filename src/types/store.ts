import { rootReducer } from '../store/reducers/root-reducer';
import { TGuitarCards, TSearchedGuitars } from './app-data';

export enum ReducerName {
  Catalog = 'catalog',
  Search = 'search',
}

export enum FetchState {
  Idle = 'idle',
  Pending = 'pending',
}

export type TCatalogDataState = {
  guitarsCards: [] | TGuitarCards;
  isDataLoaded: boolean;
  fetchState: FetchState;
  priceMinLimit: number;
  priceMaxLimit: number;
  cardTotalCount: number;
}

export type TSearchFormDataState = {
  searchedGuitars: [] | TSearchedGuitars;
  searchString: string;
}

export type TRootState = ReturnType<typeof rootReducer>;
