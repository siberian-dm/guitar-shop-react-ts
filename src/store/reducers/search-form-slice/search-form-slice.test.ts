import searchFormSlice, { initialState, resetSearchFormState, setSearchedGuitars } from './search-form-slice';

const reducer = searchFormSlice.reducer;

const mockGuitars = [
  {id: 1, name: 'guitar1'},
  {id: 2, name: 'guitar2'},
  {id: 3, name: 'guitar3'},
  {id: 4, name: 'guitar4'},
];

const mockState = {...initialState};

describe('Reducer: searchFormSlice', () => {
  it('without additional parameters should return initial state', () => {
    expect(reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should update searchedGuitars by setSearchedGuitars', () => {
    expect(reducer(mockState, setSearchedGuitars(mockGuitars)))
      .toEqual({
        ...mockState,
        searchedGuitars: mockGuitars,
      });
  });

  it('should reset state by resetSearchFormState', () => {
    expect(reducer(mockState, resetSearchFormState()))
      .toEqual(initialState);
  });
});
