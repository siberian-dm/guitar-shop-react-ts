import appDataReducer from './reducers/app-data-reducer/reducer';
import { combineReducers } from '@reduxjs/toolkit';
import { ReducerName } from '../types/store';

export const rootReducer = combineReducers({
  [ReducerName.App]: appDataReducer,
});
