import { mockSearchedGuitars } from '../../../mocks/app-mock-data';
import searchFormSlice, { initialState, resetSearchFormState, setSearchedGuitars } from './search-form-slice';

const reducer = searchFormSlice.reducer;

const mockState = {...initialState};

describe('Reducer: searchFormSlice', () => {
  it('without additional parameters should return initial state', () => {
    expect(reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should update searchedGuitars by setSearchedGuitars', () => {
    expect(reducer(mockState, setSearchedGuitars(mockSearchedGuitars)))
      .toEqual({
        ...mockState,
        searchedGuitars: mockSearchedGuitars,
      });
  });

  it('should reset state by resetSearchFormState', () => {
    expect(reducer(mockState, resetSearchFormState()))
      .toEqual(initialState);
  });
});
