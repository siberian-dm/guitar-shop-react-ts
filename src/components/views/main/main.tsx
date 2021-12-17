import Breadcrumbs from '../../common/breadcrumbs/breadcrumbs';
import CatalogSort from './catalog-sort/catalog-sort';
import FilterForm from './filter-form/filter-form';
import Footer from '../../common/footer/footer';
import Header from '../../common/header/header';
import Pagination from './pagination/pagination';
import ProductCard from './product-card/product-card';
import SvgBasket from '../../common/svg-basket/svg-basket';
import { nanoid } from '@reduxjs/toolkit';

function Main(): JSX.Element {
  const productCards = new Array(9).fill(null).map(() => ({id: nanoid()}));

  return (
    <>
      <div className="visually-hidden">
        <SvgBasket />
      </div>
      <div className="wrapper">
        <Header />
        <main className="page-content">
          <div className="container">
            <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
            <Breadcrumbs />
            <div className="catalog">
              <FilterForm />
              <CatalogSort />
              <div className="cards catalog__cards">
                {productCards.map(({ id }) => <ProductCard key={id}/>)}
              </div>
              <Pagination />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Main;
