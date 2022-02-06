import FocusLock from 'react-focus-lock';
import RateRadioInput from '../rate-radio-input/rate-radio-input';
import styles from './modal-review.module.css';
import { APIRoute, createAPI } from '../../../../services/api';
import {
  FormEvent,
  useEffect,
  useRef,
  useState
} from 'react';
import { TComment, TComments } from '../../../../types/app-data';
import { toast } from 'react-toastify';
import { useFetch } from '../../../../hooks/use-fetch';

const api = createAPI();

const radioItems = [
  {id: 'star-5', name: 'rate', value: 5, title: 'Отлично'},
  {id: 'star-4', name: 'rate', value: 4, title: 'Хорошо'},
  {id: 'star-3', name: 'rate', value: 3, title: 'Нормально'},
  {id: 'star-2', name: 'rate', value: 2, title: 'Плохо'},
  {id: 'star-1', name: 'rate', value: 1, title: 'Ужасно'},
];

type TProps = {
  guitarId: number;
  guitarName: string;
  setIsActive: (isActive: boolean) => void;
  setReviews: React.Dispatch<React.SetStateAction<TComments | []>>;
  onPostSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalReview({
  guitarId,
  guitarName,
  setIsActive,
  setReviews,
  onPostSuccess,
}: TProps): JSX.Element {
  const [isWarning, setIsWarning] = useState({
    userName: false,
    advantage: false,
    disadvantage: false,
    comment: false,
    rating: false,
  });

  const userNameRef = useRef<HTMLInputElement | null>(null);
  const advantageRef = useRef<HTMLInputElement | null>(null);
  const disadvantageRef = useRef<HTMLInputElement | null>(null);
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const radioInputRefs = useRef<(HTMLInputElement | null)[] | []>([]);

  const [postReview, isLoading, error] = useFetch(async (reviewData) => {
    const { data } = await api.post<TComment>(APIRoute.Comments, reviewData);
    setReviews((prev) => [data, ...prev]);
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const onEscKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        setIsActive(false);
      }
    };

    document.addEventListener('keydown', onEscKeyDown);

    return () => {
      document.removeEventListener('keydown', onEscKeyDown);
    };
  }, [setIsActive]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const onModalOverlayClick = () => {
    if (!isLoading) {
      setIsActive(false);
    }
  };

  const onCloseBtnClick = () => {
    setIsActive(false);
  };

  const onFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const rating = radioInputRefs.current?.find((radioInput) => radioInput?.checked === true)?.value;

    const isUserNameValid = userNameRef.current?.value !== '';
    const isRatingValid = !!rating;
    const isAdvantageValid = advantageRef.current?.value !== '';
    const isDisadvantageValid = disadvantageRef.current?.value !== '';
    const isCommentValid = commentRef.current?.value !== '';

    setIsWarning({
      userName: !isUserNameValid,
      rating: !isRatingValid,
      advantage: !isAdvantageValid,
      disadvantage: !isDisadvantageValid,
      comment: !isCommentValid,
    });

    const isReviewDataValid = isUserNameValid && isRatingValid && isAdvantageValid && isDisadvantageValid && isCommentValid;

    if (isReviewDataValid) {
      postReview({
        guitarId,
        userName: userNameRef.current?.value,
        advantage: advantageRef.current?.value,
        disadvantage: disadvantageRef.current?.value,
        comment: commentRef.current?.value,
        rating: +rating,
      });

      if (!error) {
        setIsActive(false);
        onPostSuccess(true);
      }
    }
  };

  return (
    <FocusLock>
      <div className={styles['modal-review']}>
        <div className="modal is-active modal--review">
          <div className="modal__wrapper">
            <div
              className="modal__overlay" data-close-modal
              onClick={onModalOverlayClick}
            />
            <div className="modal__content">
              <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
              <h3 className="modal__product-name title title--medium-20 title--uppercase">{guitarName}</h3>
              <form
                className="form-review"
                onSubmit={onFormSubmit}
              >
                <div className="form-review__wrapper">
                  <div className="form-review__name-wrapper">
                    <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                    <input
                      ref={userNameRef}
                      className="form-review__input form-review__input--name"
                      id="user-name"
                      type="text"
                      autoComplete="off"
                      disabled={isLoading}
                    />
                    {isWarning.userName && <span className="form-review__warning">Заполните поле</span>}
                  </div>
                  <div>
                    <span className="form-review__label form-review__label--required">Ваша Оценка</span>
                    <div className="rate rate--reverse">
                      {radioItems.map((item, index) => (
                        <RateRadioInput
                          key={item.id}
                          ref={(input) => radioInputRefs.current[index] = input}
                          data={item}
                          isLoading={isLoading}
                        />
                      ))}
                      {isWarning.rating && <span className="rate__message">Поставьте оценку</span>}
                    </div>
                  </div>
                </div>
                <label className="form-review__label" htmlFor="user-name">Достоинства</label>
                <input
                  ref={advantageRef}
                  className="form-review__input"
                  id="pros"
                  type="text"
                  autoComplete="off"
                  disabled={isLoading}
                />
                {isWarning.advantage && <span className="form-review__warning">Заполните поле</span>}
                <label className="form-review__label" htmlFor="user-name">Недостатки</label>
                <input
                  ref={disadvantageRef}
                  className="form-review__input"
                  id="user-name"
                  type="text"
                  autoComplete="off"
                  disabled={isLoading}
                />
                {isWarning.disadvantage && <span className="form-review__warning">Заполните поле</span>}
                <label className="form-review__label" htmlFor="user-name">Комментарий</label>
                <textarea
                  ref={commentRef}
                  className="form-review__input form-review__input--textarea"
                  id="user-name"
                  rows={10}
                  autoComplete="off"
                  disabled={isLoading}
                />
                {isWarning.comment && <span className="form-review__warning">Заполните поле</span>}
                <button className="button button--medium-20 form-review__button" type="submit" disabled={isLoading}>
                  {isLoading ? 'Загрузка...' : 'Отправить отзыв'}
                </button>
              </form>
              <button
                className="modal__close-btn button-cross"
                type="button"
                aria-label="Закрыть"
                onClick={onCloseBtnClick}
                disabled={isLoading}
              >
                <span className="button-cross__icon"/><span className="modal__close-btn-interactive-area"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </FocusLock>
  );
}

export default ModalReview;
