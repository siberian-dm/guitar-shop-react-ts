import ModalSuccess from './modal-success';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

const mockOnClose = jest.fn();

const fakeModalSuccess = (
  <ModalSuccess onClose={mockOnClose}/>
);

describe('Component: ModalSuccess', () => {
  test('should render correctly', () => {
    render(fakeModalSuccess);

    expect(screen.getByText('Спасибо за ваш отзыв!')).toBeInTheDocument();
    expect(screen.getByText('К покупкам!')).toBeInTheDocument();
    expect(screen.getByLabelText('Закрыть')).toBeInTheDocument();
  });

  test('should calls mockSetIsActive on buttons click and overlay click', async () => {
    render(fakeModalSuccess);

    fireEvent.click(screen.getByText('К покупкам!'));

    await waitFor(() => {
      expect(mockOnClose).toBeCalledTimes(1);
    });

    fireEvent.click(screen.getByLabelText('Закрыть'));

    await waitFor(() => {
      expect(mockOnClose).toBeCalledTimes(2);
    });

    fireEvent.click(screen.getByTestId('modal-overlay'));

    await waitFor(() => {
      expect(mockOnClose).toBeCalledTimes(3);
    });
  });
});
