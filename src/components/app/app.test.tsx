import API, { APIRoute } from '../../services/api';
import App from './app';
import MockAdapter from 'axios-mock-adapter';
import { AppRoute } from '../../const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { getMockGuitarCardsWithComments } from '../../mocks/app-mock-data';
import { initialState as catalogInitialState } from '../../store/reducers/catalog-slice/catalog-slice';
import { initialState as searchFormInitialState } from '../../store/reducers/search-slice/search-slice';
import { Provider } from 'react-redux';
import { ReducerName } from '../../types/store';
import { render, screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';

const mockStore = configureMockStore();

const store = mockStore({
  [ReducerName.Catalog]: {...catalogInitialState},
  [ReducerName.Search]: {...searchFormInitialState},
});

const mockGuitar = getMockGuitarCardsWithComments(1)[0];

const mockAPI = new MockAdapter(API);

mockAPI
  .onGet(`${APIRoute.Guitars}/1?_embed=comments`)
  .reply(200, mockGuitar);

store.dispatch = jest.fn();

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Catalog" view when user navigate to "/"', () => {
    render(fakeApp);
    history.push(AppRoute.Root);

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
  });

  it('should render "Product" view when user navigate to "/product/:id"', async () => {
    history.push(`${AppRoute.Product}/1`);

    render(fakeApp);

    await waitFor(() => {
      const mainTitle = screen.getAllByRole('heading')[0];
      expect(mainTitle).toHaveTextContent(mockGuitar.name);
    });
  });

  it('should render "NotFound" view when user navigate to non-existent route', () => {
    render(fakeApp);
    history.push('/non-existent');

    expect(screen.getByText(/404. Страница не найдена!/i)).toBeInTheDocument();
    expect(screen.getByText(/На главную/i)).toBeInTheDocument();
  });
});
