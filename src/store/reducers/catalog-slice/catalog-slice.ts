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
    loadGuitarsCards: (state, action) => {
      state.guitarsCards = action.payload;
    },
    loadPriceMinLimit: (state, action) => {
      state.priceMinLimit = action.payload;
    },
    loadPriceMaxLimit: (state, action) => {
      state.priceMaxLimit = action.payload;
    },
    loadCardTotalCount: (state, action) => {
      state.cardTotalCount = action.payload;
    },
    setFetchState: (state, action) => {
      state.fetchState = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPageNumber = action.payload;
    },
  },
});

const { actions } = catalogSlice;

export const {
  loadGuitarsCards,
  loadPriceMinLimit,
  loadPriceMaxLimit,
  setFetchState,
  setCurrentPage,
  loadCardTotalCount,
} = actions;

export default catalogSlice;
