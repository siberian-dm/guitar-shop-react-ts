import ReviewItem from './review-item';
import { getMockComment } from '../../../../mocks/app-mock-data';
import { render, screen } from '@testing-library/react';
import { formatDate } from '../../../../utils/date';

const mockReview = getMockComment(1);

const fakeReviewItem = (<ReviewItem review={mockReview}/>);

describe('Component: ReviewItem', () => {
  test('should render correctly', () => {
    render(fakeReviewItem);

    expect(screen.getByText(mockReview.userName)).toBeInTheDocument();
    expect(screen.getByText(formatDate(mockReview.createAt))).toBeInTheDocument();
    expect(screen.getByTestId('product-rate')).toBeInTheDocument();
    expect(screen.getByText('Достоинства:')).toBeInTheDocument();
    expect(screen.getByText(mockReview.advantage)).toBeInTheDocument();
    expect(screen.getByText('Недостатки:')).toBeInTheDocument();
    expect(screen.getByText(mockReview.disadvantage)).toBeInTheDocument();
    expect(screen.getByText('Комментарий:')).toBeInTheDocument();
    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();
  });
});
