import Breadcrumbs from '../../common/breadcrumbs/breadcrumbs';
import Sort from './sort/sort';
import Filter from './filter/filter';
import MainLayout from '../../common/main-layout/main-layout';
import Pagination from './pagination/pagination';
import ProductList from './propuct-list/product-list';

function Catalog(): JSX.Element {
  return (
    <MainLayout>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <Breadcrumbs />
          <div className="catalog">
            <Filter />
            <Sort />
            <ProductList />
            <Pagination />
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

export default Catalog;
