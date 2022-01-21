import catalogSlice from './catalog-slice/catalog-slice';
import searchSlice from './search-slice/search-slice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  [catalogSlice.name]: catalogSlice.reducer,
  [searchSlice.name]: searchSlice.reducer,
});
