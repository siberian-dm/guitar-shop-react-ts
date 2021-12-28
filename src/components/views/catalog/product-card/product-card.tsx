import ProductRate, { RateType } from '../../../common/product-rate/product-rate';
import { formatPrice } from '../../../../utils/common';
import { TGuitarCard } from '../../../../types/app-data';

type TProps = {
  card: TGuitarCard;
}

function ProductCard({ card }: TProps): JSX.Element {
  const {
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
