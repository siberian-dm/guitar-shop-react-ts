import { createSlice } from '@reduxjs/toolkit';
import { FetchState, ReducerName, TCatalogDataState } from '../../../types/store';

export const initialState: TCatalogDataState = {
  guitarsCards: [],
  fetchState: FetchState.Idle,
  priceMinLimit: 0,
  priceMaxLimit: 0,
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
  },
});

const { actions } = catalogSlice;

export const {
  setGuitarsCards,
  setPriceMinLimit,
  setPriceMaxLimit,
  setFetchState,
  setCardTotalCount,
} = actions;

export default catalogSlice;
