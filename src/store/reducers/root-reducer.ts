import catalogSlice from './catalog-slice/catalog-slice';
import searchFormSlice from './search-form-slice/search-form-slice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  [catalogSlice.name]: catalogSlice.reducer,
  [searchFormSlice.name]: searchFormSlice.reducer,
});
