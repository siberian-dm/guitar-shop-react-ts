import API, { APIRoute } from '../../../../services/api';
import MockAdapter from 'axios-mock-adapter';
import ReviewList from './review-list';
import { getMockComments } from '../../../../mocks/app-mock-data';
import { render, screen, waitFor } from '@testing-library/react';

const guitarId1 = 1;
const guitarId2 = 2;

const mockComments = getMockComments(guitarId1);

const mockAPI = new MockAdapter(API);

mockAPI
  .onGet(`${APIRoute.Guitars}/${guitarId1}/comments`)
  .reply(200, mockComments, {'x-total-count': 100})
  .onGet(`${APIRoute.Guitars}/${guitarId2}/comments`)
  .reply(200, []);

const mockFetchGuitar = jest.fn();

const fakeReviewList = (guitarId: number) => (
  <ReviewList
    guitarName="ROMAN LX"
    guitarId={guitarId.toString()}
    fetchGuitar={mockFetchGuitar}
  />
);

describe('Component: ReviewList', () => {
  test('should render correctly', async () => {
    render(fakeReviewList(guitarId1));

    expect(screen.getByText('Отзывы')).toBeInTheDocument();
    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
    expect(screen.getByText('Наверх')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Показать еще отзывы')).toBeInTheDocument();
    });

    for (const comment of mockComments) {
      expect(screen.getByText(comment.userName)).toBeInTheDocument();
    }
  });

  test('should show a stub if there are no comments', async () => {
    render(fakeReviewList(guitarId2));

    await waitFor(() => {
      expect(screen.getByText('По данному товару еще нет отзывов...')).toBeInTheDocument();
    });
  });
});
