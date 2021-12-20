import { formatPrice } from '../../../../utils/common';
import { Guitar } from '../../../../types/app-data';

const RATES = [1, 2, 3, 4, 5];

type Props = {
  card: Guitar;
}

function ProductCard({ card }: Props): JSX.Element {
  const {
    name,
    previewImg,
    price,
    rating,
  } = card;

  const roundRating = Math.round(rating);

  return (
    <div className="product-card">
      <img src={previewImg} width="75" height="190" alt={name}/>
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true">
          <span className="visually-hidden">Рейтинг:</span>
          {RATES.map((value) => (
            <svg width="12" height="11" aria-hidden="true" key={value}>
              <use xlinkHref={value <= roundRating ? '#icon-full-star' : '#icon-star'}/>
            </svg>
          ))}
          <span className="rate__count">9</span><span className="rate__message"/>
        </div>
        <p className="product-card__title">
          {name}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{formatPrice(price)}
        </p>
      </div>
      <div className="product-card__buttons">
        <a className="button button--mini" href="#no_scroll">
          Подробнее
        </a>
        <a className="button button--red button--mini button--add-to-cart" href="#no_scroll">
          Купить
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
