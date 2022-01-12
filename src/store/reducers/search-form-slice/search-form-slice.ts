import { createSlice } from '@reduxjs/toolkit';
import { ReducerName, TSearchFormDataState } from '../../../types/store';

export const initialState: TSearchFormDataState = {
  searchedGuitars: [],
};

const searchFormSlice = createSlice({
  name: ReducerName.SearchForm,
  initialState,
  reducers: {
    setSearchedGuitars: (state, action) => {
      state.searchedGuitars = action.payload;
    },
  },
});

const { actions } = searchFormSlice;

export const { setSearchedGuitars } = actions;

export default searchFormSlice;
