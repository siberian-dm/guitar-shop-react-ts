import { createSlice } from '@reduxjs/toolkit';
import { FetchState, ReducerName, TCatalogDataState } from '../../../types/store';

export const initialState: TCatalogDataState = {
  guitarsCards: [],
  fetchState: FetchState.Idle,
  priceMinLimit: 0,
  priceMaxLimit: 0,
  currentPageNumber: 1,
  cardTotalCount: 0,
};

const catalogSlice = createSlice({
  name: ReducerName.Catalog,
  initialState,
  reducers: {
    setGuitarsCards: (state, action) => {
      state.guitarsCards = action.payload;
    },
    setPriceMinLimit: (state, action) => {
      state.priceMinLimit = action.payload;
    },
    setPriceMaxLimit: (state, action) => {
      state.priceMaxLimit = action.payload;
    },
    setCardTotalCount: (state, action) => {
      state.cardTotalCount = action.payload;
    },
    setFetchState: (state, action) => {
      state.fetchState = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPageNumber = action.payload;
    },
    resetCatalogState: (state) => {
      state.guitarsCards = [];
      state.priceMinLimit = 0;
      state.priceMaxLimit = 0;
      state.cardTotalCount = 0;
      state.currentPageNumber = 1;
      state.fetchState = FetchState.Idle;
    },
  },
});

const { actions } = catalogSlice;

export const {
  setGuitarsCards,
  setPriceMinLimit,
  setPriceMaxLimit,
  setFetchState,
  setCurrentPage,
  setCardTotalCount,
  resetCatalogState,
} = actions;

export default catalogSlice;
