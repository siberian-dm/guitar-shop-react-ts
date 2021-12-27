import { rootReducer } from '../store/reducers/root-reducer';
import { TGuitarCards } from './app-data';

export enum ReducerName {
  App = 'app',
  FilterType = 'filterType',
}

export enum FetchState {
  Idle = 'idle',
  Pending = 'pending',
}

export type TAppDataState = {
  guitarsCards: [] | TGuitarCards;
  fetchState: FetchState;
  currentRequestId: null | string,
  error: undefined | string,
}

export type TFilterTypeDataState = {
  isAcousticCheck: boolean;
  isElectricCheck: boolean;
  isUkuleleCheck: boolean;
};

export type TRootState = ReturnType<typeof rootReducer>;
