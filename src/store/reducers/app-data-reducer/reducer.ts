import { adaptDataToClient } from './adapter';
import { createSlice } from '@reduxjs/toolkit';
import { fetchGuitarsCardsAction } from '../../api-action';
import { FetchState, ReducerName, TAppDataState } from '../../../types/store';

const initialState: TAppDataState = {
  guitarsCards: [],
  fetchState: FetchState.Idle,
  currentRequestId: null,
  error: undefined,
};

const appDataSlice = createSlice({
  name: ReducerName.App,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuitarsCardsAction.pending, (state, action) => {
        if (state.fetchState === FetchState.Idle) {
          state.fetchState = FetchState.Pending;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchGuitarsCardsAction.fulfilled, (state, action) => {
        state.guitarsCards = adaptDataToClient(action.payload);
        state.fetchState = FetchState.Idle;
        state.currentRequestId = null;
        state.error = undefined;
      })
      .addCase(fetchGuitarsCardsAction.rejected, (state, action) => {
        state.fetchState = FetchState.Idle;
        state.error = action.error.message;
        state.currentRequestId = null;
      });
  },
});


const { reducer } = appDataSlice;

export default reducer;
