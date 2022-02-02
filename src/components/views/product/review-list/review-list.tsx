import Loader from '../../../common/loader/loader';
import ReviewItem from '../rewiew-item/review-item';
import { APIRoute, createAPI } from '../../../../services/api';
import { QueryField } from '../../../../const';
import { TComments } from '../../../../types/app-data';
import { useEffect, useState } from 'react';
import { useFetch } from '../../../../hooks/use-fetch';

const LOAD_LIMIT = 3;

const api = createAPI();

type TProps = {
  guitarId: string;
}

function ReviewList({ guitarId }: TProps): JSX.Element {
  const [reviews, setReviews] = useState<TComments | []>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [fetchReviews, isLoading, error] = useFetch(
    async (id: string) => {
      const firstIndexSlice = reviews.length;
      const secondIndexSlice = reviews.length + LOAD_LIMIT;

      const { data, headers } = await api.get(
        `${APIRoute.Guitars}/${id}/comments`,
        {params: {
          // [QueryField.Limit]: LOAD_LIMIT,
          [QueryField.Start]: firstIndexSlice,
          [QueryField.End]: secondIndexSlice,
        }},
      );

      setReviews((prev) => [...prev, ...data]);
      setTotalCount(headers['x-total-count']);
    });

  useEffect(() => {
    fetchReviews(guitarId);
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [guitarId]);

  const onMoreBtnClick = () => {
    fetchReviews(guitarId);
  };

  const isShowMoreBtn = reviews.length < totalCount;

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a
        className="button button--red-border button--big reviews__sumbit-button"
        href="#no_scroll"
      >
        Оставить отзыв
      </a>
      {reviews !==null && (
        reviews.map((review) => <ReviewItem key={review.id} review={review}/>)
      )}

      {error && <h3>{error.message}</h3>}

      {isLoading && <Loader />}
      {isShowMoreBtn && (
        <button
          className="button button--medium reviews__more-button"
          onClick={onMoreBtnClick}
        >
          Показать еще отзывы
        </button>
      )}
      <a
        className="button button--up button--red-border button--big reviews__up-button"
        href="#header"
      >
        Наверх
      </a>
    </section>
  );
}

export default ReviewList;
