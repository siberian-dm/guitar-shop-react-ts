import ProductRate, { RateType } from '../../../common/product-rate/product-rate';
import { formatPrice } from '../../../../utils/common';
import { Link } from 'react-router-dom';
import { TGuitarCard } from '../../../../types/app-data';
import { AppRoute } from '../../../../const';

type TProps = {
  card: TGuitarCard;
}

function ProductCard({ card }: TProps): JSX.Element {
  const {
    id,
    name,
    previewImg,
    price,
    rating,
    comments,
  } = card;

  const adaptedPreviewImg = previewImg.replace('img/', '/img/content/');

  return (
    <div className="product-card">
      <img src={adaptedPreviewImg} width="75" height="190" alt={name}/>
      <div className="product-card__info">
        <ProductRate
          rating={rating}
          rateType={RateType.ProductCard}
          rateCount={comments.length}
        />
        <p
          data-testid="product-name"
          className="product-card__title"
        >
          {name}
        </p>
        <p
          data-testid="product-price"
          className="product-card__price"
        >
          <span className="visually-hidden">Цена:</span>{formatPrice(price)}
        </p>
      </div>
      <div className="product-card__buttons">
        <Link
          className="button button--mini"
          to={`${AppRoute.Product}/${id}`}
        >
          Подробнее
        </Link>
        <Link
          className="button button--red button--mini button--add-to-cart"
          to={''}
          onClick={(evt) => {
            evt.preventDefault();
          }}
        >
          Купить
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
