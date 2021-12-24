import { ActionType } from '../types/action';
import { APIRoute, createAPI } from '../services/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchState, ReducerName, TRootState } from '../types/store';
import { TGuitarCards } from '../types/app-data';
import { toast } from 'react-toastify';

const api = createAPI();

export const fetchGuitarsCardsAction = createAsyncThunk<
  TGuitarCards,
  string,
  {state: TRootState}
>(
  ActionType.FetchGuitarsCards,
  async (queryString, { getState, requestId }) => {
    const { currentRequestId, fetchState } = getState()[ReducerName.App];

    if (fetchState !== FetchState.Pending || requestId !== currentRequestId) {
      return;
    }

    try {
      const { data } = await api.get(
        `${APIRoute.GuitarsWithComments}${queryString && `&${queryString}`}`,
      );

      return data;
    }
    catch (error) {
      const errorMessage = (error as {message: string}).message;

      if (errorMessage) {
        toast.error(errorMessage);
      }
    }
  },
);
