import { rootReducer } from '../store/reducers/root-reducer';
import { TGuitarCards } from './app-data';

export enum ReducerName {
  App = 'APP',
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

export type TRootState = ReturnType<typeof rootReducer>;
