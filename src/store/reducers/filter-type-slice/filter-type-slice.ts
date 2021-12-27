import { createSlice } from '@reduxjs/toolkit';
import { ReducerName, TFilterTypeDataState } from '../../../types/store';

const initialState: TFilterTypeDataState = {
  isAcousticCheck: false,
  isElectricCheck: false,
  isUkuleleCheck: false,
};

const filterTypeSlice = createSlice({
  name: ReducerName.FilterType,
  initialState,
  reducers: {
    setIsAcousticCheck: (state, action) => {
      state.isAcousticCheck = action.payload;
    },
    setIsElectricCheck: (state, action) => {
      state.isElectricCheck = action.payload;
    },
    setIsUkuleleCheck: (state, action) => {
      state.isUkuleleCheck = action.payload;
    },
  },
});


const { actions } = filterTypeSlice;

export const { setIsAcousticCheck, setIsElectricCheck, setIsUkuleleCheck } = actions;
export default filterTypeSlice;
