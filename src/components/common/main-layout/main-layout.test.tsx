import MainLayout from './main-layout';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { initialState as searchFormInitialState } from '../../../store/reducers/search-form-slice/search-form-slice';
import { Provider } from 'react-redux';
import { ReducerName } from '../../../types/store';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';

const mockStore = configureMockStore();

const store = mockStore({
  [ReducerName.SearchForm]: {...searchFormInitialState},
});
const history = createMemoryHistory();

describe('Component: MainLayout', () => {
  it('should render correctly', () => {

    const fakePage = <h1>Main page</h1>;

    render(
      <Provider store={store}>
        <Router history={history}>
          <MainLayout>
            {fakePage}
          </MainLayout>
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('svg-basket')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByText('Main page')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
