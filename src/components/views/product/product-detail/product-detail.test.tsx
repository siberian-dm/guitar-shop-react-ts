import ProductDetail, { productTypes } from './product-detail';
import { fireEvent, render, screen } from '@testing-library/react';
import { formatPrice } from '../../../../utils/common';
import { getMockGuitarCard } from '../../../../mocks/app-mock-data';

const mockGuitar = getMockGuitarCard(1);

const fakeProductDetail = (<ProductDetail data={mockGuitar}/>);

describe('Component: Product', ()=> {
  test('should render correctly' ,() => {
    render(fakeProductDetail);

    const links = screen.getAllByRole('link');
    expect(links[0]).not.toHaveClass('button--black-border');
    expect(links[0]).toHaveTextContent('Характеристики');
    expect(links[1]).toHaveClass('button--black-border');
    expect(links[1]).toHaveTextContent('Описание');
    expect(links[2]).toHaveTextContent('Добавить в корзину');

    expect(screen.getByTestId('product-rate')).toBeInTheDocument();
    expect(screen.getByText('Артикул:')).toBeInTheDocument();
    expect(screen.getByText(mockGuitar.vendorCode)).toBeInTheDocument();
    expect(screen.getByText('Тип:')).toBeInTheDocument();
    expect(screen.getByText(productTypes[mockGuitar.type])).toBeInTheDocument();
    expect(screen.getByText('Количество струн:')).toBeInTheDocument();
    expect(screen.getByText(`${mockGuitar.stringCount} струнная`)).toBeInTheDocument();
    expect(screen.getByText('Цена:')).toBeInTheDocument();
    expect(screen.getByText(formatPrice(mockGuitar.price))).toBeInTheDocument();
    expect(screen.getByText(mockGuitar.description)).toBeInTheDocument();

    expect(screen.getByTestId('characteristics')).not.toHaveClass('hidden');
    expect(screen.getByTestId('description')).toHaveClass('hidden');
  });

  test('should hide the contents of the tabs when the user clicks on the tab buttons', () => {
    render(fakeProductDetail);

    const links = screen.getAllByRole('link');

    fireEvent.click(links[1]);

    expect(screen.getByTestId('characteristics')).toHaveClass('hidden');
    expect(screen.getByTestId('description')).not.toHaveClass('hidden');

    fireEvent.click(links[0]);

    expect(screen.getByTestId('characteristics')).not.toHaveClass('hidden');
    expect(screen.getByTestId('description')).toHaveClass('hidden');
  });
});
