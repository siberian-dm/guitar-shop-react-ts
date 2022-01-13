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
    resetSearchFormState: (state) => {
      state.searchedGuitars = [];
    },
  },
});

const { actions } = searchFormSlice;

export const { setSearchedGuitars, resetSearchFormState } = actions;

export default searchFormSlice;
