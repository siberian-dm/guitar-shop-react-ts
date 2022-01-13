import ProductCard from './product-card';
import { createMemoryHistory } from 'history';
import { getMockGuitarCardsWithComments } from '../../../../mocks/app-mock-data';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';

describe('Component: ProductCard', () => {
  const history = createMemoryHistory();
  const productCard = getMockGuitarCardsWithComments(1)[0];

  it('should render correctly', () => {
    render(
      <Router history={history}>
        <ProductCard card={productCard}/>
      </Router>,
    );

    expect(screen.getByTestId('product-rate')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByTestId('product-name')).toBeInTheDocument();
    expect(screen.getByTestId('product-price')).toBeInTheDocument();
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
    expect(screen.getByText('Купить')).toBeInTheDocument();
  });
});
