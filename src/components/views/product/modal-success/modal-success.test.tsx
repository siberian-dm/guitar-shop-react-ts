import ModalSuccess from './modal-success';
import { fireEvent, render, screen } from '@testing-library/react';

const mockSetIsActive = jest.fn();

const fakeModalSuccess = (
  <ModalSuccess setIsActive={mockSetIsActive}/>
);

describe('Component: ModalSuccess', () => {
  test('should render correctly', () => {
    render(fakeModalSuccess);

    expect(screen.getByText('Спасибо за ваш отзыв!')).toBeInTheDocument();
    expect(screen.getByText('К покупкам!')).toBeInTheDocument();
    expect(screen.getByLabelText('Закрыть')).toBeInTheDocument();
  });

  test('should calls mockSetIsActive on buttons click and overlay click', () => {
    render(fakeModalSuccess);

    fireEvent.click(screen.getByText('К покупкам!'));
    expect(mockSetIsActive).toBeCalledTimes(1);

    fireEvent.click(screen.getByLabelText('Закрыть'));
    expect(mockSetIsActive).toBeCalledTimes(2);

    fireEvent.click(screen.getByTestId('modal-overlay'));
    expect(mockSetIsActive).toBeCalledTimes(3);
  });
});
