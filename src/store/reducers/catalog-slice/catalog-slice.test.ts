import catalogSlice, {
  initialState,
  setCardTotalCount,
  setFetchState,
  setGuitarsCards,
  setPriceMaxLimit,
  setPriceMinLimit
} from './catalog-slice';
import { CATALOG_PAGE_SIZE } from '../../../const';
import { FetchState } from '../../../types/store';
import { getMockGuitarCardsWithComments } from '../../../mocks/app-mock-data';

const reducer = catalogSlice.reducer;

const mockGuitars = getMockGuitarCardsWithComments(CATALOG_PAGE_SIZE);

const mockState = {...initialState};

describe('Reducer: catalogSlice', () => {
  it('without additional parameters should return initial state', () => {
    expect(reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(mockState);
  });

  it('should update guitarsCards by setGuitarsCards', () => {
    expect(reducer(mockState, setGuitarsCards(mockGuitars)))
      .toEqual({
        ...mockState,
        isDataLoaded: true,
        guitarsCards: mockGuitars,
      });
  });

  it('should update fetchState by setFetchState', () => {
    expect(reducer(mockState, setFetchState(FetchState.Pending)))
      .toEqual({
        ...mockState,
        fetchState: FetchState.Pending,
      });
  });

  it('should update priceMinLimit by setPriceMinLimit', () => {
    expect(reducer(mockState, setPriceMinLimit(1500)))
      .toEqual({
        ...mockState,
        priceMinLimit: 1500,
      });
  });

  it('should update priceMaxLimit by setPriceMaxLimit', () => {
    expect(reducer(mockState, setPriceMaxLimit(15000)))
      .toEqual({
        ...mockState,
        priceMaxLimit: 15000,
      });
  });

  it('should update cardTotalCount by setCardTotalCount', () => {
    expect(reducer(mockState, setCardTotalCount(27)))
      .toEqual({
        ...mockState,
        cardTotalCount: 27,
      });
  });
});
