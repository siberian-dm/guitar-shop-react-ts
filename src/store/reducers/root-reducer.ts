import appDataReducer from './app-data-reducer/reducer';
import { combineReducers } from '@reduxjs/toolkit';
import { ReducerName } from '../../types/store';
import filterTypeSlice from './filter-type-slice/filter-type-slice';


export const rootReducer = combineReducers({
  [ReducerName.App]: appDataReducer,
  [filterTypeSlice.name]: filterTypeSlice.reducer,
});
