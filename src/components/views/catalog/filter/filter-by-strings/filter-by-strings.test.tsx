import FilterByStrings from './filter-by-strings';
import { createMemoryHistory } from 'history';
import { QueryParamProvider } from 'use-query-params';
import { render, screen } from '@testing-library/react';
import { Route, Router } from 'react-router-dom';

const history = createMemoryHistory();

const fakeFilterByStrings = (
  <Router history={history}>
    <QueryParamProvider ReactRouterRoute={Route}>
      <FilterByStrings />
    </QueryParamProvider>
  </Router>
);

describe('Component: FilterByPrice', () => {
  it('should render correctly', () => {
    render(fakeFilterByStrings);

    const checkboxs = screen.getAllByRole('checkbox');

    for (const checkbox of checkboxs) {
      expect(checkbox).not.toBeChecked();
    }
  });

  it('should render correctly when getting query params', () => {
    history.push('/?stringCount=4&stringCount=6&stringCount=7&stringCount=12');
    render(fakeFilterByStrings);

    const checkboxs = screen.getAllByRole('checkbox');

    for (const checkbox of checkboxs) {
      expect(checkbox).toBeChecked();
    }
  });
});
