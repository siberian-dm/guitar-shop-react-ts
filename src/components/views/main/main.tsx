import Breadcrumbs from '../../common/breadcrumbs/breadcrumbs';
import CatalogSort from './catalog-sort/catalog-sort';
import FilterForm from './filter-form/filter-form';
import Footer from '../../common/footer/footer';
import Header from '../../common/header/header';
import Pagination from './pagination/pagination';
import ProductCard from './product-card/product-card';
import SvgBasket from '../../common/svg-basket/svg-basket';
import { getGuitarsCards } from '../../../store/reducers/app-data-reducer/selectors';
import { useSelector } from 'react-redux';

const PAGE_SIZE = 9;

function Main(): JSX.Element {
  const guitarCards = useSelector(getGuitarsCards).slice(0, PAGE_SIZE);

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
                {guitarCards.length !==0 && (
                  guitarCards.map((card) => <ProductCard key={card.id} card={card}/>)
                )}
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
