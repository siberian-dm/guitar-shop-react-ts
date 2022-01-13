import ProductRate, { RateType, svgParams } from './product-rate';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';

describe('Component: ProductRate', () => {
  const history = createMemoryHistory();

  it('should render correctly with rateType={RateType.ProductCard} props', () => {
    render(
      <Router history={history}>
        <ProductRate rating={3.7} rateType={RateType.ProductCard} rateCount={6}/>
      </Router>,
    );

    const svgIcons = screen.getAllByTestId('svg-icon');
    expect(svgIcons[0]).toHaveAttribute('width', svgParams[RateType.ProductCard].width.toString());
    expect(svgIcons[0]).toHaveAttribute('height', svgParams[RateType.ProductCard].height.toString());

    const fullStars = screen.getAllByTestId('full-star');
    const stars = screen.getAllByTestId('star');
    expect(fullStars.length).toEqual(4);
    expect(stars.length).toEqual(1);

    expect(screen.getByText('6')).toBeInTheDocument();
  });

  it('should render correctly with rateType={RateType.ProductPage} props', () => {
    render(
      <Router history={history}>
        <ProductRate rating={3.7} rateType={RateType.ProductPage} rateCount={6}/>
      </Router>,
    );

    const svgIcons = screen.getAllByTestId('svg-icon');
    expect(svgIcons[0]).toHaveAttribute('width', svgParams[RateType.ProductPage].width.toString());
    expect(svgIcons[0]).toHaveAttribute('height', svgParams[RateType.ProductPage].height.toString());

    const fullStars = screen.getAllByTestId('full-star');
    const stars = screen.getAllByTestId('star');
    expect(fullStars.length).toEqual(4);
    expect(stars.length).toEqual(1);

    expect(screen.getByText('6')).toBeInTheDocument();
  });
});
