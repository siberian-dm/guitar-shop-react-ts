import { ActionType } from '../types/action';
import { APIRoute, createAPI } from '../services/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchState, ReducerName, TRootState } from '../types/store';
import { TGuitarCards } from '../types/app-data';

const api = createAPI();

export const fetchGuitarsCardsAction = createAsyncThunk<TGuitarCards, void, {state: TRootState}>(
  ActionType.FetchGuitarsCards,
  async (_arg, { getState, requestId }) => {
    const { currentRequestId, fetchState } = getState()[ReducerName.App];

    if (fetchState !== FetchState.Pending || requestId !== currentRequestId) {
      return;
    }

    const { data } = await api.get(APIRoute.Guitars);
    return data;
  },
);
