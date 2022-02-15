import { formatPrice } from '../../../../utils/common';
import { productTypes } from '../../product/product-detail/product-detail';
import { TCartGuitar } from '../../../../types/app-data';


type TProps = {
  guitar: TCartGuitar;
}

function CartItem({ guitar }: TProps): JSX.Element {
  const {
    name,
    type,
    vendorCode,
    stringCount,
    previewImg,
    price,
  } = guitar;

  const adaptedPreviewImg = previewImg.replace('img/', '/img/content/');

  return (
    <div className="cart-item">
      <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить">
        <span className="button-cross__icon"/><span className="cart-item__close-button-interactive-area"/>
      </button>
      <div className="cart-item__image">
        <img src={adaptedPreviewImg} width="55" height="130" alt={name}/>
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{name}</p>
        <p className="product-info__info">Артикул: {vendorCode}</p>
        <p className="product-info__info">{`${productTypes[type]}, ${stringCount} струнная`}</p>
      </div>
      <div className="cart-item__price">{formatPrice(price)}</div>
      <div className="quantity cart-item__quantity">
        <button className="quantity__button" aria-label="Уменьшить количество">
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"/>
          </svg>
        </button>
        <input className="quantity__input" type="number" placeholder="1" id="2-count" name="2-count" max="99"/>
        <button className="quantity__button" aria-label="Увеличить количество">
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"/>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{formatPrice(price)}</div>
    </div>
  );
}

export default CartItem;
