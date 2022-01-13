import FilterByType from './filter-by-type';
import { createMemoryHistory } from 'history';
import { QueryParamProvider } from 'use-query-params';
import { render, screen } from '@testing-library/react';
import { Route, Router } from 'react-router-dom';

const history = createMemoryHistory();

const fakeFilterByType = (
  <Router history={history}>
    <QueryParamProvider ReactRouterRoute={Route}>
      <FilterByType />
    </QueryParamProvider>
  </Router>
);

describe('Component: FilterByType', () => {
  it('should render correctly', () => {
    render(fakeFilterByType);

    const checkboxs = screen.getAllByRole('checkbox');

    for (const checkbox of checkboxs) {
      expect(checkbox).not.toBeChecked();
    }
  });

  it('should render correctly when getting query params', () => {
    history.push('/?type=acoustic&type=electric&type=ukulele');
    render(fakeFilterByType);

    const checkboxs = screen.getAllByRole('checkbox');

    for (const checkbox of checkboxs) {
      expect(checkbox).toBeChecked();
    }
  });
});
