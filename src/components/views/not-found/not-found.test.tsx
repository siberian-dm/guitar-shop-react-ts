import NotFound from './not-found';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';

describe('Component: NotFound', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <NotFound />
      </Router>,
    );

    expect(screen.getByText('404. Страница не найдена!')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('На главную');
  });
});
