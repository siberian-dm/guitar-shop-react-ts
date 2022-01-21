import { createSlice } from '@reduxjs/toolkit';
import { ReducerName, TSearchFormDataState } from '../../../types/store';

export const initialState: TSearchFormDataState = {
  searchedGuitars: [],
  searchString: '',
};

const searchSlice = createSlice({
  name: ReducerName.Search,
  initialState,
  reducers: {
    setSearchedGuitars: (state, action) => {
      state.searchedGuitars = action.payload;
    },
    setSearchedString: (state, action) => {
      state.searchString = action.payload;
    },
    resetSearchState: (state) => {
      state.searchedGuitars = [];
    },
  },
});

const { actions } = searchSlice;

export const { setSearchedGuitars, setSearchedString, resetSearchState } = actions;

export default searchSlice;
