import { getMockCartGuitars } from '../../../mocks/app-mock-data';
import Breadcrumbs from '../../common/breadcrumbs/breadcrumbs';
import MainLayout from '../../common/main-layout/main-layout';
import CartFooter from './cart-footer/cart-footer';
import CartItem from './cart-item/cart-item';

function Cart(): JSX.Element {
  const goods = getMockCartGuitars();
  const totalPrice = goods.reduce((prev, curr) => prev + curr.price, 0);

  return (
    <MainLayout>
      <main className="page-content">
        <div className="container">
          <h1 className="title title--bigger page-content__title">Корзина</h1>
          <Breadcrumbs lastItemName="Корзина"/>
          <div className="cart">
            {goods.map((item) => <CartItem key={item.id} guitar={item}/>)}
            <CartFooter totalPrice={totalPrice}/>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

export default Cart;
