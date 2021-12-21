import { ReducerName, TRootState } from '../../../types/store';
import { TGuitarCards } from '../../../types/app-data';

export const getGuitarsCards = (state: TRootState): TGuitarCards => state[ReducerName.App].guitarsCards;
