import ProductRate, { RateType } from '../../../common/product-rate/product-rate';
import { formatDate } from '../../../../utils/date';
import { TComment } from '../../../../types/app-data';

type TProps = {
  review: TComment;
}

function ReviewItem({ review }: TProps): JSX.Element {
  const {
    userName,
    advantage,
    disadvantage,
    comment,
    rating,
    createAt,
  } = review;

  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">
          {userName}
        </h4><span className="review__date">{formatDate(createAt)}</span>
      </div>
      <ProductRate rating={rating} rateType={RateType.ProductReview}/>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{advantage}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{comment}</p>
    </div>
  );
}

export default ReviewItem;
