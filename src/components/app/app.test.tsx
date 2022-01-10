import App from './app';
import { AppRoute } from '../../const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { initialState } from '../../store/reducers/catalog-slice/catalog-slice';
import { Provider } from 'react-redux';
import { ReducerName } from '../../types/store';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';

const mockStore = configureMockStore();

const store = mockStore({
  [ReducerName.Catalog]: {...initialState},
});

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
    history.push(AppRoute.Root);
    render(fakeApp);

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
  });

  it('should render "Product" view when user navigate to "/product/:id"', () => {
    history.push(`${AppRoute.Product}/1`);
    render(fakeApp);

    expect(screen.getByText(/Товар/i)).toBeInTheDocument();
  });

  it('should render "NotFound" view when user navigate to non-existent route', () => {
    history.push('/non-existent');
    render(fakeApp);

    expect(screen.getByText(/404. Страница не найдена!/i)).toBeInTheDocument();
    expect(screen.getByText(/На главную/i)).toBeInTheDocument();
  });
});
