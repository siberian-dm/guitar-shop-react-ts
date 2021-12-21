import Breadcrumbs from '../../common/breadcrumbs/breadcrumbs';
import CatalogSort from './catalog-sort/catalog-sort';
import FilterForm from './filter-form/filter-form';
import MainLayout from '../../common/main-layout/main-layout';
import Pagination from './pagination/pagination';
import ProductList from './propuct-list/product-list';

function Main(): JSX.Element {
  return (
    <MainLayout>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <Breadcrumbs />
          <div className="catalog">
            <FilterForm />
            <CatalogSort />
            <ProductList />
            <Pagination />
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

export default Main;
