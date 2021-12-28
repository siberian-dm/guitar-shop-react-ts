import { Action, ThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { TRootState } from './store';

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, TRootState, AxiosInstance, Action>;
