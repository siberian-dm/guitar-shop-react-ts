import MockAdapter from 'axios-mock-adapter';
import ProductList from './product-list';
import thunk from 'redux-thunk';
import { AppRoute, CATALOG_PAGE_SIZE } from '../../../../const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../../../services/api';
import { createMemoryHistory } from 'history';
import { getMockGuitarCardsWithComments } from '../../../../mocks/app-mock-data';
import { initialState } from '../../../../store/reducers/catalog-slice/catalog-slice';
import { Provider } from 'react-redux';
import { ReducerName } from '../../../../types/store';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(mockAPI)];

const mockStore = configureMockStore(middlewares);

const store = mockStore({
  [ReducerName.Catalog]: {
    ...initialState,
    guitarsCards: getMockGuitarCardsWithComments(CATALOG_PAGE_SIZE),
  },
});

const history = createMemoryHistory();

const fakeProductList = (
  <Provider store={store}>
    <Router history={history}>
      <ProductList />
    </Router>
  </Provider>
);

describe('Component: ProductList', () => {
  it('should render correctly', () => {
    render(fakeProductList);

    expect(screen.getByTestId('product-list')).toBeInTheDocument();

    const productCards = screen.getAllByText('Подробнее');
    expect(productCards.length).toEqual(CATALOG_PAGE_SIZE);
  });

  it('should call dispatch with function after change search params', () => {
    history.push(`${AppRoute.CatalogInitialPage}?type=ukulele`);

    store.dispatch = jest.fn();

    render(fakeProductList);

    expect(store.dispatch).toHaveBeenLastCalledWith(expect.any(Function));
  });
});
