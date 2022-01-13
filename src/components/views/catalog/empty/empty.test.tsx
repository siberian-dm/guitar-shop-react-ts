import Empty from './empty';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';

describe('Component: Empty', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Empty />
      </Router>,
    );

    expect(screen.getByText('По вашему запросу ничего не найдено.')).toBeInTheDocument();
  });
});
