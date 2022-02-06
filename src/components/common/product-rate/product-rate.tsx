import classNames from 'classnames';

const RATES = [1, 2, 3, 4, 5];

export enum RateType {
  ProductCard,
  ProductPage,
  ProductReview,
}

export const svgParams = {
  [RateType.ProductCard]: {
    width: 12,
    height: 11,
  },
  [RateType.ProductPage]: {
    width: 14,
    height: 14,
  },
  [RateType.ProductReview]: {
    width: 16,
    height: 16,
  },
};

type TProps = {
  rating: number;
  rateType: RateType;
  rateCount?: number;
}

function ProductRate({ rating, rateType, rateCount }: TProps): JSX.Element {
  const roundRating = Math.round(rating);

  const rateClass = classNames(
    'rate',
    {
      'product-card__rate': rateType === RateType.ProductCard,
      'product-container__rating': rateType === RateType.ProductPage,
      'review__rating-panel': rateType === RateType.ProductReview,
    });

  return (
    <div
      data-testid="product-rate"
      className={rateClass}
      aria-hidden="true"
    >
      <span className="visually-hidden">Рейтинг:</span>
      {RATES.map((value) => (
        <svg
          data-testid="svg-icon"
          width={svgParams[rateType].width}
          height={svgParams[rateType].height}
          aria-hidden="true"
          key={value}
        >
          <use
            data-testid={value <= roundRating ? 'full-star' : 'star'}
            xlinkHref={value <= roundRating ? '#icon-full-star' : '#icon-star'}
          />
        </svg>
      ))}
      <span className="rate__count">{rateCount && rateCount}</span><span className="rate__message"/>
    </div>
  );
}

export default ProductRate;
