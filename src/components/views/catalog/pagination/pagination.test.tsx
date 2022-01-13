import MockAdapter from 'axios-mock-adapter';
import Pagination from './pagination';
import thunk from 'redux-thunk';
import { AppRoute, CATALOG_PAGE_SIZE } from '../../../../const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../../../services/api';
import { createMemoryHistory } from 'history';
import { getMockGuitarCardsWithComments } from '../../../../mocks/app-mock-data';
import { initialState } from '../../../../store/reducers/catalog-slice/catalog-slice';
import { Provider } from 'react-redux';
import { QueryParamProvider } from 'use-query-params';
import { ReducerName } from '../../../../types/store';
import { render, screen } from '@testing-library/react';
import { Route, Router } from 'react-router-dom';

const PRODUCT_CARD_COUNT = 42;

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(mockAPI)];

const mockStore = configureMockStore(middlewares);

const history = createMemoryHistory();

const store = mockStore({
  [ReducerName.Catalog]: {
    ...initialState,
    guitarsCards: getMockGuitarCardsWithComments(CATALOG_PAGE_SIZE),
    cardTotalCount: PRODUCT_CARD_COUNT,
  },
});

const fakePagination = (
  <Provider store={store}>
    <Router history={history}>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Route path={AppRoute.Catalog} exact>
          <Pagination />
        </Route>
      </QueryParamProvider>
    </Router>
  </Provider>
);

describe('Component: Pagination', () => {
  it('should render correctly when current page is 3', () => {
    history.push(`${AppRoute.CatalogPage}3`);

    render(fakePagination);

    const linkItems = screen.getAllByRole('listitem');
    expect(linkItems.length).toEqual(4);

    expect(screen.queryByText('Назад')).not.toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Далее')).toBeInTheDocument();
  });

  it('should render correctly when current page is 6', () => {
    history.push(`${AppRoute.CatalogPage}6`);

    render(fakePagination);

    const linkItems = screen.getAllByRole('listitem');
    expect(linkItems.length).toEqual(5);

    expect(screen.getByText('Назад')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('Далее')).toBeInTheDocument();
  });

  it('should render correctly when current page is 7', () => {
    history.push(`${AppRoute.CatalogPage}7`);

    render(fakePagination);

    const linkItems = screen.getAllByRole('listitem');
    expect(linkItems.length).toEqual(2);

    expect(screen.getByText('Назад')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.queryByText('Далее')).not.toBeInTheDocument();
  });
});
