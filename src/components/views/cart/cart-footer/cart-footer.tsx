import { formatPrice } from '../../../../utils/common';

type TProps = {
  totalPrice: number;
}

function CartFooter({ totalPrice }: TProps): JSX.Element {
  const couponCost = 3000;
  const priceWitthCoupon = totalPrice - couponCost;

  return (
    <div className="cart__footer">
      <div className="cart__coupon coupon">
        <h2 className="title title--little coupon__title">Промокод на скидку</h2>
        <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
        <form className="coupon__form" id="coupon-form" method="post" action="/">
          <div className="form-input coupon__input">
            <label className="visually-hidden">Промокод</label>
            <input type="text" placeholder="Введите промокод" id="coupon" name="coupon"/>
            <p className="form-input__message form-input__message--success">Промокод принят</p>
          </div>
          <button className="button button--big coupon__button">Применить</button>
        </form>
      </div>
      <div className="cart__total-info">
        <p className="cart__total-item">
          <span className="cart__total-value-name">Всего:</span><span className="cart__total-value">{formatPrice(totalPrice)}</span>
        </p>
        <p className="cart__total-item">
          <span className="cart__total-value-name">Скидка:</span><span className="cart__total-value cart__total-value--bonus">- {formatPrice(couponCost)}</span>
        </p>
        <p className="cart__total-item">
          <span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">{formatPrice(priceWitthCoupon)}</span>
        </p>
        <button className="button button--red button--big cart__order-button">Оформить заказ</button>
      </div>
    </div>
  );
}

export default CartFooter;
