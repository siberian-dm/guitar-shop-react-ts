import Breadcrumbs from './breadcrumbs';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';

describe('Component: Breadcrumbs', () => {
  it('should render correctly without props', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Breadcrumbs />
      </Router>,
    );

    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Каталог')).toBeInTheDocument();
  });

  it('should render correctly with lastItemName props', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Breadcrumbs lastItemName='ROMAN LX'/>
      </Router>,
    );

    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Каталог')).toBeInTheDocument();
    expect(screen.getByText('ROMAN LX')).toBeInTheDocument();
  });
});
