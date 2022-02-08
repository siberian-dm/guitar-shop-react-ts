import API, { APIRoute } from '../../../services/api';
import App from '../../app/app';
import MockAdapter from 'axios-mock-adapter';
import { AppRoute } from '../../../const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { getMockGuitarCardsWithComments } from '../../../mocks/app-mock-data';
import { initialState } from '../../../store/reducers/search-slice/search-slice';
import { Provider } from 'react-redux';
import { ReducerName } from '../../../types/store';
import { render, screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';

const mockStore = configureMockStore();

const store = mockStore({
  [ReducerName.Search]: {...initialState},
});

const mockGuitar = getMockGuitarCardsWithComments(1)[0];

const mockAPI = new MockAdapter(API);

mockAPI
  .onGet(`${APIRoute.Guitars}/1?_embed=comments`)
  .reply(200, mockGuitar);

const history = createMemoryHistory();

const fakeProduct = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Component: Product', () => {
  it('should render "Product" view correctly', async () => {
    history.push(`${AppRoute.Product}/1`);
    render(fakeProduct);

    expect(screen.getByTestId('svg-spinner')).toBeInTheDocument();

    await waitFor(() => {
      const mainTitle = screen.getAllByRole('heading')[0];
      expect(mainTitle).toHaveTextContent(mockGuitar.name);
    });

    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
    expect(screen.getByTestId('product-detail')).toBeInTheDocument();
    expect(screen.getByTestId('reviews')).toBeInTheDocument();
  });
});
