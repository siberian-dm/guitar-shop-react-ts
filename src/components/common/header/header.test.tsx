import Header from './header';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';

describe('Component: Header', () => {
  it ('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Header />
      </Router>,
    );

    const links = screen.getAllByRole('link');

    expect(links[0]).toHaveClass('header__logo');
    expect(links[1]).toHaveTextContent('Каталог');
    expect(links[2]).toHaveTextContent('Где купить?');
    expect(links[3]).toHaveTextContent('О компании');
    expect(links[4]).toHaveAccessibleName('Корзина');

    expect(screen.getByPlaceholderText('что вы ищите?')).toBeInTheDocument();
    expect(screen.getByText('Перейти в корзину')).toBeInTheDocument();
  });
});
