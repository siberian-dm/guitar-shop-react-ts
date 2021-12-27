import { ReducerName, TRootState } from '../../../types/store';

export const getIsAcousticCheck = (state: TRootState) => state[ReducerName.FilterType].isAcousticCheck;

export const getIsElectricCheck = (state: TRootState) => state[ReducerName.FilterType].isElectricCheck;

export const getIsUkuleleCheck = (state: TRootState) => state[ReducerName.FilterType].isUkuleleCheck;
