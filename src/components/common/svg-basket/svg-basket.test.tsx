import SvgBasket from './svg-basket';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';

describe('Component: SvgBasket', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <SvgBasket />
      </Router>,
    );

    expect(screen.getByTestId('svg-basket')).toBeInTheDocument();
  });
});
