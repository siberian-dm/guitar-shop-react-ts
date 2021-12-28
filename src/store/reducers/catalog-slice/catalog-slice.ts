import { createSlice } from '@reduxjs/toolkit';
import { FetchState, ReducerName, TCatalogDataState } from '../../../types/store';

const initialState: TCatalogDataState = {
  guitarsCards: [],
  fetchState: FetchState.Idle,
  priceMinLimit: 0,
  priceMaxLimit: 0,
};

const catalogSlice = createSlice({
  name: ReducerName.Catalog,
  initialState,
  reducers: {
    loadGuitarsCards: (state, action) => {
      state.guitarsCards = action.payload;
    },
    loadPriceMinLimit: (state, action) => {
      state.priceMinLimit = action.payload;
    },
    loadPriceMaxLimit: (state, action) => {
      state.priceMaxLimit = action.payload;
    },
    setFetchState: (state, action) => {
      state.fetchState = action.payload;
    },
  },
});

const { actions } = catalogSlice;

export const {
  loadGuitarsCards,
  loadPriceMinLimit,
  loadPriceMaxLimit,
  setFetchState,
} = actions;

export default catalogSlice;
