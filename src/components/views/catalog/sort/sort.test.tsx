import Sort from './sort';
import { createMemoryHistory } from 'history';
import { QueryParamProvider } from 'use-query-params';
import { render, screen } from '@testing-library/react';
import { Route, Router } from 'react-router-dom';

const history = createMemoryHistory();

const fakeSort = (
  <Router history={history}>
    <QueryParamProvider ReactRouterRoute={Route}>
      <Sort />
    </QueryParamProvider>
  </Router>
);

describe('Component: Sort', () => {
  it('should render correctly', () => {
    render(fakeSort);

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toEqual(4);

    expect(buttons[0]).toHaveTextContent('по цене');
    expect(buttons[1]).toHaveTextContent('по популярности');
    expect(buttons[2]).toHaveAccessibleName('По возрастанию');
    expect(buttons[3]).toHaveAccessibleName('По убыванию');
  });

  it(
    'should render with active buttons, sorted by price and sorted in ascending order',
    () => {
      history.push('/?_sort=price&_order=asc');
      render(fakeSort);

      const buttons = screen.getAllByRole('button');

      expect(buttons[0]).toHaveClass('catalog-sort__type-button--active');
      expect(buttons[1]).not.toHaveClass('catalog-sort__type-button--active');
      expect(buttons[2]).toHaveClass('catalog-sort__order-button--active');
      expect(buttons[3]).not.toHaveClass('catalog-sort__order-button--active');
    });

  it(
    'should render with active buttons, sorted by rating and sorted in descending order',
    () => {
      history.push('/?_sort=rating&_order=desc');
      render(fakeSort);

      const buttons = screen.getAllByRole('button');

      expect(buttons[0]).not.toHaveClass('catalog-sort__type-button--active');
      expect(buttons[1]).toHaveClass('catalog-sort__type-button--active');
      expect(buttons[2]).not.toHaveClass('catalog-sort__order-button--active');
      expect(buttons[3]).toHaveClass('catalog-sort__order-button--active');
    });
});
