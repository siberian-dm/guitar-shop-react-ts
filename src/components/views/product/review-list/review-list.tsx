import Loader from '../../../common/loader/loader';
import ModalReview from '../modal-review/modal-review';
import ReviewItem from '../rewiew-item/review-item';
import styles from './review-list.module.css';
import { APIRoute, createAPI } from '../../../../services/api';
import { MouseEvent, useEffect, useState } from 'react';
import { QueryField, SortOrder, SortType } from '../../../../const';
import { TComments } from '../../../../types/app-data';
import { useFetch } from '../../../../hooks/use-fetch';

const LOAD_LIMIT = 3;

const api = createAPI();

type TProps = {
  guitarName: string;
  guitarId: string;
}

function ReviewList({ guitarName, guitarId }: TProps): JSX.Element {
  const [reviews, setReviews] = useState<TComments | []>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isModalReviewActive, setIsModalReviewActive] = useState(false);

  const [fetchReviews, isLoading, error] = useFetch(
    async (id: string) => {
      const firstIndexSlice = reviews.length;
      const secondIndexSlice = reviews.length + LOAD_LIMIT;

      const { data, headers } = await api.get(
        `${APIRoute.Guitars}/${id}/comments`,
        {params: {
          [QueryField.Start]: firstIndexSlice,
          [QueryField.End]: secondIndexSlice,
          [QueryField.Sort]: SortType.CreateAt,
          [QueryField.Order]: SortOrder.Descending,
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

  const onReviewBtnClick = (evt: MouseEvent) => {
    evt.preventDefault();
    setIsModalReviewActive(true);
  };

  const isShowMoreBtn = reviews.length < totalCount;

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a
        className="button button--red-border button--big reviews__sumbit-button"
        href="#no_scroll"
        onClick={onReviewBtnClick}
      >
        Оставить отзыв
      </a>
      {reviews.length !== 0
        ? reviews.map((review) => <ReviewItem key={review.id} review={review}/>)
        : <p className={styles['no-reviews-text']}>По данному товару еще нет отзывов...</p>}
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
        className={`button button--up button--red-border button--big reviews__up-button ${styles['up-button']}`}
        href="#header"
      >
        Наверх
      </a>
      {isModalReviewActive && (
        <ModalReview
          guitarName={guitarName}
          setIsActive={setIsModalReviewActive}
        />
      )}
    </section>
  );
}

export default ReviewList;
