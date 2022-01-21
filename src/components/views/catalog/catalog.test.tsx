import Catalog from './catalog';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { CATALOG_PAGE_SIZE } from '../../../const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../../services/api';
import { createMemoryHistory } from 'history';
import { getMockGuitarCardsWithComments } from '../../../mocks/app-mock-data';
import { initialState as searchFormInitialState } from '../../../store/reducers/search-slice/search-slice';
import { initialState as catalogInitialState } from '../../../store/reducers/catalog-slice/catalog-slice';
import { Provider } from 'react-redux';
import { QueryParamProvider } from 'use-query-params';
import { ReducerName } from '../../../types/store';
import { render, screen } from '@testing-library/react';
import { Route, Router } from 'react-router-dom';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(mockAPI)];

const mockStore = configureMockStore(middlewares);

const history = createMemoryHistory();

const store = mockStore({
  [ReducerName.Search]: {
    ...searchFormInitialState,
  },
  [ReducerName.Catalog]: {
    ...catalogInitialState,
    guitarsCards: getMockGuitarCardsWithComments(CATALOG_PAGE_SIZE),
  },
});

const fakeCatalog = (
  <Provider store={store}>
    <Router history={history}>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Catalog />
      </QueryParamProvider>
    </Router>
  </Provider>
);

describe('Component: Catalog', () => {
  it('should render correctly', () => {
    render(fakeCatalog);

    expect(screen.getByTestId('main-layout')).toBeInTheDocument();
    expect(screen.getByText('Каталог гитар')).toBeInTheDocument();
    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
    expect(screen.getByText('Фильтр')).toBeInTheDocument();
    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
    expect(screen.getByTestId('product-list')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});
