import catalogSlice from './catalog-slice/catalog-slice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  [catalogSlice.name]: catalogSlice.reducer,
});
