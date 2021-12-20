import { GuitarCards } from './app-data';
import { rootReducer } from '../store/reducers/root-reducer';

export enum ReducerName {
  App = 'APP',
}

export enum FetchState {
  Idle = 'idle',
  Pending = 'pending',
}

export type AppDataState = {
  guitarsCards: [] | GuitarCards;
  fetchState: FetchState;
  currentRequestId: null | string,
  error: undefined | string,
}

export type RootState = ReturnType<typeof rootReducer>;
