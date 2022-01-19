import Header from './header';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { initialState as searchFormInitialState } from '../../../store/reducers/search-slice/search-slice';
import { Provider } from 'react-redux';
import { ReducerName } from '../../../types/store';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';

const mockStore = configureMockStore();

const store = mockStore({
  [ReducerName.Search]: {...searchFormInitialState},
});

const history = createMemoryHistory();

const fakeHeader = (
  <Provider store={store}>
    <Router history={history}>
      <Header />
    </Router>
  </Provider>
);

describe('Component: Header', () => {
  it ('should render correctly', () => {
    render(fakeHeader);

    const links = screen.getAllByRole('link');

    expect(links[0]).toHaveClass('header__logo');
    expect(links[1]).toHaveTextContent('Каталог');
    expect(links[2]).toHaveTextContent('Где купить?');
    expect(links[3]).toHaveTextContent('О компании');
    expect(links[4]).toHaveAccessibleName('Корзина');

    expect(screen.getByPlaceholderText('что вы ищите?')).toBeInTheDocument();
    expect(screen.getByText('Перейти в корзину')).toBeInTheDocument();
  });
});
