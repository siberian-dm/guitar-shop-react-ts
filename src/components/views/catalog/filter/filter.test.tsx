import Filter from './filter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { initialState } from '../../../../store/reducers/catalog-slice/catalog-slice';
import { Provider } from 'react-redux';
import { QueryParamProvider } from 'use-query-params';
import { ReducerName } from '../../../../types/store';
import { render, screen } from '@testing-library/react';
import { Route, Router } from 'react-router-dom';

const mockStore = configureMockStore();

const history = createMemoryHistory();

const store = mockStore({
  [ReducerName.Catalog]: {
    ...initialState,
  },
});

const fakeFilter = (
  <Provider store={store}>
    <Router history={history}>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Filter />
      </QueryParamProvider>
    </Router>
  </Provider>
);

describe('Component: Pagination', () => {
  it('should render correctly', () => {
    render(fakeFilter);

    expect(screen.getByText('Фильтр')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-price')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-strings')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-type')).toBeInTheDocument();
  });
});
