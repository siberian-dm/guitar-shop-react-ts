import MockAdapter from 'axios-mock-adapter';
import SearchForm from './search-form';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { act, render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../../../../services/api';
import { createMemoryHistory } from 'history';
import { DEBOUNCE_DELAY } from '../../../../../const';
import { initialState, setSearchedString } from '../../../../../store/reducers/search-slice/search-slice';
import { Provider } from 'react-redux';
import { ReducerName } from '../../../../../types/store';
import { Router } from 'react-router-dom';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(mockAPI)];

const mockStore = configureMockStore(middlewares);

const store = mockStore({
  [ReducerName.Search]: {...initialState},
});

const history = createMemoryHistory();

const props = {
  setInputElement: jest.fn(),
  onInputFocus: jest.fn(),
  onInputBlur: jest.fn(),
};

const fakeSearchForm = (
  <Provider store={store}>
    <Router history={history}>
      <SearchForm {...props}/>
    </Router>
  </Provider>
);

describe('Component: SearchForm', () => {
  it('should render correctly', () => {
    render(fakeSearchForm);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Начать поиск')).toBeInTheDocument();

    const input = screen.getByPlaceholderText('что вы ищите?');
    expect(input).toBeInTheDocument();
  });

  it('should call setInputElement after render', () => {
    render(fakeSearchForm);

    expect(props.setInputElement).toHaveBeenCalled();
  });

  it('should call onInputFocus/onInputBlur on input focus/blur', () => {
    render(fakeSearchForm);

    const input = screen.getByPlaceholderText('что вы ищите?');

    input.focus();
    expect(props.onInputFocus).toHaveBeenCalled();

    input.blur();
    expect(props.onInputBlur).toHaveBeenCalled();
  });

  it('should call dispatch with setSearchedString action on input change after DEBOUNCE_DELAY', async () => {
    store.dispatch = jest.fn();

    render(fakeSearchForm);

    const input = screen.getByPlaceholderText('что вы ищите?');

    userEvent.type(input, ' test test ');

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, DEBOUNCE_DELAY));
    });

    expect(store.dispatch).toHaveBeenLastCalledWith(setSearchedString('test test'));
  });
});
