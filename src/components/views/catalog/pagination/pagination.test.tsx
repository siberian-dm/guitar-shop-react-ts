import Pagination from './pagination';
import { AppRoute, CATALOG_PAGE_SIZE } from '../../../../const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { getMockGuitarCardsWithComments } from '../../../../mocks/app-mock-data';
import { initialState } from '../../../../store/reducers/catalog-slice/catalog-slice';
import { Provider } from 'react-redux';
import { QueryParamProvider } from 'use-query-params';
import { ReducerName } from '../../../../types/store';
import { render, screen } from '@testing-library/react';
import { Route, Router } from 'react-router-dom';

const PRODUCT_CARD_COUNT = 42;

const mockStore = configureMockStore();

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
  it('should render correctly when current page is 1', () => {
    history.push(`${AppRoute.CatalogPage}1`);

    render(fakePagination);

    const linkItems = screen.getAllByRole('listitem');
    expect(linkItems.length).toEqual(4);

    expect(screen.queryByText('Назад')).not.toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Далее')).toBeInTheDocument();
  });

  it('should render correctly when current page is 2', () => {
    history.push(`${AppRoute.CatalogPage}2`);

    render(fakePagination);

    const linkItems = screen.getAllByRole('listitem');
    expect(linkItems.length).toEqual(5);

    expect(screen.getByText('Назад')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Далее')).toBeInTheDocument();
  });

  it('should render correctly when current page is 5', () => {
    history.push(`${AppRoute.CatalogPage}5`);

    render(fakePagination);

    const linkItems = screen.getAllByRole('listitem');
    expect(linkItems.length).toEqual(3);

    expect(screen.getByText('Назад')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.queryByText('Далее')).not.toBeInTheDocument();
  });
});
