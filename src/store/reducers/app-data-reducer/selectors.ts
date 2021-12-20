import { GuitarCards } from '../../../types/app-data';
import { ReducerName, RootState } from '../../../types/store';

export const getGuitarsCards = (state: RootState): GuitarCards => state[ReducerName.App].guitarsCards;
