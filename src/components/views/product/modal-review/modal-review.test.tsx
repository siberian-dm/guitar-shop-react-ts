import API, { APIRoute } from '../../../../services/api';
import MockAdapter from 'axios-mock-adapter';
import ModalReview from './modal-review';
import userEvent from '@testing-library/user-event';
import {
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';

const GUITAR_ID = 1;
const GUITAR_NAME = 'ROMAN LX';
const TEXT = 'test';

const mockAPI = new MockAdapter(API);

const mockReviewData = {
  guitarId: GUITAR_ID,
  userName: TEXT,
  advantage: TEXT,
  disadvantage: TEXT,
  comment: TEXT,
  rating: 4,
};

mockAPI
  .onPost(APIRoute.Comments, mockReviewData)
  .reply(200, {});

const mockSetIsActive = jest.fn();
const mockSetReviews = jest.fn();
const mockOnPostSucces = jest.fn();

const fakeModalReview = (
  <ModalReview
    guitarId={GUITAR_ID}
    guitarName={GUITAR_NAME}
    setReviews={mockSetReviews}
    setIsActive={mockSetIsActive}
    onPostSuccess={mockOnPostSucces}
  />
);

describe('Component: ModalReview', () => {
  test('should render correctly', () => {
    render(fakeModalReview);

    const textInputs = screen.getAllByRole('textbox');
    expect(textInputs.length).toEqual(4);

    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
    expect(screen.getByText('Ваше Имя')).toBeInTheDocument();
    expect(screen.getByText('Ваша Оценка')).toBeInTheDocument();
    expect(screen.getByText('Достоинства')).toBeInTheDocument();
    expect(screen.getByText('Недостатки')).toBeInTheDocument();
    expect(screen.getByText('Комментарий')).toBeInTheDocument();
    expect(screen.getByText('Отправить отзыв')).toBeInTheDocument();
    expect(screen.getByLabelText('Закрыть')).toBeInTheDocument();
  });

  test('should call mockSetIsActive on close button click and overlay click', () => {
    render(fakeModalReview);

    fireEvent.click(screen.getByLabelText('Закрыть'));
    expect(mockSetIsActive).toBeCalledTimes(1);

    fireEvent.click(screen.getByTestId('modal-overlay'));
    expect(mockSetIsActive).toBeCalledTimes(2);
  });

  test('should show warnings when fields are empty on form submission', () => {
    render(fakeModalReview);

    fireEvent.click(screen.getByText('Отправить отзыв'));

    const textInputs = screen.getAllByRole('textbox');
    const warnings = screen.getAllByText('Заполните поле');

    expect(warnings.length).toEqual(textInputs.length);
    expect(screen.getByText('Поставьте оценку')).toBeInTheDocument();

    expect(mockSetIsActive).not.toBeCalled();
    expect(mockOnPostSucces).not.toBeCalled();
  });

  test('should call mockSetIsActive, mockSetReviews, mockOnPostSucces on form submission', async () => {
    render(fakeModalReview);

    const textInputs = screen.getAllByRole('textbox');
    const radioInputs = screen.getAllByRole('radio');

    fireEvent.click(radioInputs[1]);

    for (const textInput of textInputs) {
      userEvent.type(textInput, TEXT);
    }

    fireEvent.click(screen.getByText('Отправить отзыв'));

    expect(mockSetIsActive).toBeCalledTimes(1);
    expect(mockOnPostSucces).toBeCalledTimes(1);

    await waitFor(() => {
      expect(mockSetReviews).toBeCalledTimes(1);
    });
  });
});
