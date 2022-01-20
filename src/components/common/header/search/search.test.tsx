import MockAdapter from 'axios-mock-adapter';
import Search from './search';
import thunk from 'redux-thunk';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../../../services/api';
import { createMemoryHistory } from 'history';
import { initialState } from '../../../../store/reducers/search-slice/search-slice';
import { Provider } from 'react-redux';
import { ReducerName } from '../../../../types/store';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(mockAPI)];

const mockStore = configureMockStore(middlewares);

const history = createMemoryHistory();

const fakeSearchForm = (store: MockStore) => (
  <Provider store={store}>
    <Router history={history}>
      <Search />
    </Router>
  </Provider>
);

describe('Component: Search', () => {
  it('should render correctly', () => {
    const store = mockStore({
      [ReducerName.Search]: {...initialState},
    });

    render(fakeSearchForm(store));

    expect(screen.getByRole('button')).toBeInTheDocument();

    expect(screen.getByText('Начать поиск')).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText('что вы ищите?');
    expect(searchInput).toBeInTheDocument();
  });
});
