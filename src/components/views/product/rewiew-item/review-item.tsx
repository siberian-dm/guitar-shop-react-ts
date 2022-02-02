import { TComment } from '../../../../types/app-data';
import ProductRate, { RateType } from '../../../common/product-rate/product-rate';

type TProps = {
  review: TComment;
}

function ReviewItem({ review }: TProps): JSX.Element {
  const {
    userName,
    advantages,
    disadvantages,
    comment,
    rating,
    createAt,
  } = review;

  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">
          {userName}
        </h4><span className="review__date">{createAt}</span>
      </div>
      <ProductRate rating={rating} rateType={RateType.ProductReview}/>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{advantages}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{disadvantages}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{comment}</p>
    </div>
  );
}

export default ReviewItem;
