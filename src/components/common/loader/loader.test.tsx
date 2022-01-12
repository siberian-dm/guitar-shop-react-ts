import Loader from './loader';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';

describe('Component: Loader', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Loader />
      </Router>,
    );

    expect(screen.getByTestId('svg-spinner')).toBeInTheDocument();
  });
});
