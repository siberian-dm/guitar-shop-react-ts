import MockAdapter from 'axios-mock-adapter';
import SearchForm from './search-form';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../../../services/api';
import { createMemoryHistory } from 'history';
// import { DEBOUNCE_DELAY } from '../../../../hooks/use-debounce';
import { Provider } from 'react-redux';
import { ReducerName } from '../../../../types/store';
import { act, render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { DEBOUNCE_DELAY } from '../../../../const';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(mockAPI)];

const mockStore = configureMockStore(middlewares);

const history = createMemoryHistory();

const fakeSearchForm = (store: MockStore) => (
  <Provider store={store}>
    <Router history={history}>
      <SearchForm />
    </Router>
  </Provider>
);

describe('Component: SearchForm', () => {
  it('should render correctly', () => {
    const store = mockStore({
      [ReducerName.SearchForm]: {searchedGuitars: [
        {id: 0, name: 'test1'},
        {id: 1, name: 'test2'},
        {id: 2, name: 'test3'},
        {id: 3, name: 'test4'},
      ]},
    });

    render(fakeSearchForm(store));

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('list')).toHaveClass('list-opened');
    expect(screen.getByText('test1')).toBeInTheDocument();
    expect(screen.getByText('test2')).toBeInTheDocument();
    expect(screen.getByText('test3')).toBeInTheDocument();
    expect(screen.getByText('test4')).toBeInTheDocument();
    expect(screen.getByText('Начать поиск')).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText('что вы ищите?');
    expect(searchInput).toBeInTheDocument();

    userEvent.type(searchInput, 'test5');
    expect(searchInput).toHaveDisplayValue('test5');
  });

  it('should render without select list', () => {
    const store = mockStore({
      [ReducerName.SearchForm]: {searchedGuitars: []},
    });

    render(fakeSearchForm(store));

    expect(screen.getByRole('list')).toHaveClass('hidden');
  });

  it('should call dispatch with function after user input', async () => {
    const store = mockStore({
      [ReducerName.SearchForm]: {searchedGuitars: []},
    });

    store.dispatch = jest.fn();

    render(fakeSearchForm(store));

    const searchInput = screen.getByPlaceholderText('что вы ищите?');

    userEvent.type(searchInput, 'test');

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, DEBOUNCE_DELAY));
    });

    expect(store.dispatch).toHaveBeenLastCalledWith(expect.any(Function));
  });
});
