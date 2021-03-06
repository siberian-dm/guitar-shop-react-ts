import API, { APIRoute } from '../../../../services/api';
import Loader from '../../../common/loader/loader';
import ModalReview from '../modal-review/modal-review';
import ModalSuccess from '../modal-success/modal-success';
import ReviewItem from '../rewiew-item/review-item';
import styles from './review-list.module.css';
import { MouseEvent, useEffect, useState } from 'react';
import { QueryField, SortOrder, SortType } from '../../../../const';
import { TComments } from '../../../../types/app-data';
import { useFetch } from '../../../../hooks/use-fetch';

const LOAD_LIMIT = 3;

type TProps = {
  guitarName: string;
  guitarId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchGuitar: (...args: any[]) => Promise<void>;
}

function ReviewList({ guitarName, guitarId, fetchGuitar }: TProps): JSX.Element {
  const [reviews, setReviews] = useState<TComments | []>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isModalReviewActive, setIsModalReviewActive] = useState(false);
  const [isModalSuccessActive, setIsModalSuccessActive] = useState(false);

  const [fetchReviews, isLoading, error] = useFetch(
    async (id: string) => {
      const firstIndexSlice = reviews.length;
      const secondIndexSlice = reviews.length + LOAD_LIMIT;

      const { data, headers } = await API.get(
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

  const onModalReviewClose = () => {
    setIsModalReviewActive(false);
  };

  const onPostReviewSuccess = () => {
    setIsModalSuccessActive(true);
  };

  const onModalSuccessClose = () => {
    setIsModalSuccessActive(false);
    fetchGuitar(guitarId);
  };

  const isShowMoreBtn = reviews.length < totalCount;

  return (
    <section
      className="reviews"
      data-testid="reviews"
    >
      <h3 className="reviews__title title title--bigger">????????????</h3>
      <a
        className="button button--red-border button--big reviews__sumbit-button"
        href="#no_scroll"
        onClick={onReviewBtnClick}
      >
        ???????????????? ??????????
      </a>
      {reviews.length !== 0
        ? reviews.map((review) => <ReviewItem key={review.id} review={review}/>)
        : <p className={styles['no-reviews-text']}>???? ?????????????? ???????????? ?????? ?????? ??????????????...</p>}
      {error && <h3>{error.message}</h3>}
      {isLoading && <Loader />}
      {isShowMoreBtn && (
        <button
          className="button button--medium reviews__more-button"
          onClick={onMoreBtnClick}
        >
          ???????????????? ?????? ????????????
        </button>
      )}
      <a
        className={`button button--up button--red-border button--big reviews__up-button ${styles['up-button']}`}
        href="#header"
      >
        ????????????
      </a>
      {isModalReviewActive && (
        <ModalReview
          guitarId={+guitarId}
          guitarName={guitarName}
          onClose={onModalReviewClose}
          onPostSuccess={onPostReviewSuccess}
        />
      )}
      {isModalSuccessActive && (
        <ModalSuccess
          onClose={onModalSuccessClose}
        />
      )}
    </section>
  );
}

export default ReviewList;
