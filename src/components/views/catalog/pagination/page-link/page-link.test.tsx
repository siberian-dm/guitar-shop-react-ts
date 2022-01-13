import PageLink from './page-link';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';

describe('Component: PageLink', () => {
  it('active PageLink should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <PageLink pageNumber={1} isActive/>
      </Router>,
    );
    const linkItem = screen.getByRole('listitem');

    expect(linkItem).toHaveClass('pagination__page--active');
  });

  it('not active PageLink should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <PageLink pageNumber={1} isActive={false}/>
      </Router>,
    );
    const linkItem = screen.getByRole('listitem');

    expect(linkItem).toHaveClass('pagination__page');
  });
});
