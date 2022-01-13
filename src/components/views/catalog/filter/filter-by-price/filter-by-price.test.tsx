import FilterByPrice from './filter-by-price';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { initialState } from '../../../../../store/reducers/catalog-slice/catalog-slice';
import { Provider } from 'react-redux';
import { QueryParamProvider } from 'use-query-params';
import { ReducerName } from '../../../../../types/store';
import { render, screen } from '@testing-library/react';
import { Route, Router } from 'react-router-dom';

const PRICE_MIN = 1700;
const PRICE_MAX = 3500;

const mockStore = configureMockStore();

const history = createMemoryHistory();

const store = mockStore({
  [ReducerName.Catalog]: {
    ...initialState,
    priceMinLimit: PRICE_MIN,
    priceMaxLimit: PRICE_MAX,
  },
});

const fakeFilterByPrice = (
  <Provider store={store}>
    <Router history={history}>
      <QueryParamProvider ReactRouterRoute={Route}>
        <FilterByPrice />
      </QueryParamProvider>
    </Router>
  </Provider>
);

describe('Component: FilterByPrice', () => {
  it('should render correctly', () => {
    render(fakeFilterByPrice);

    const priceMinInput = screen.getByPlaceholderText(PRICE_MIN.toString());
    const priceMaxInput = screen.getByPlaceholderText(PRICE_MAX.toString());

    expect(priceMinInput).toBeInTheDocument();
    expect(priceMinInput).toHaveValue(null);

    expect(priceMaxInput).toBeInTheDocument();
    expect(priceMaxInput).toHaveValue(null);
  });

  it('should render correctly when getting query params', () => {
    history.push('/?price_gte=1800&price_lte=30000');
    render(fakeFilterByPrice);

    const priceMinInput = screen.getByPlaceholderText(PRICE_MIN.toString());
    const priceMaxInput = screen.getByPlaceholderText(PRICE_MAX.toString());

    expect(priceMinInput).toHaveValue(1800);
    expect(priceMaxInput).toHaveValue(30000);
  });
});
