import Breadcrumbs from '../../common/breadcrumbs/breadcrumbs';
import MainLayout from '../../common/main-layout/main-layout';
import ProductDetail from './product-detail/product-detail';
import Reviews from './reviews/reviews';
import useFetch from '../../../hooks/use-fetch';
import { APIRoute } from '../../../services/api';
import { AppRoute } from '../../../const';
import { Redirect, useParams } from 'react-router-dom';
import { TGuitarCard } from '../../../types/app-data';

const NOT_FOUND_STATUS_CODE = 404;

type TParams = {
  id?: string;
}

function Product(): JSX.Element {
  const { id } = useParams<TParams>();

  const { data, error, isLoading } = useFetch<TGuitarCard>(`${APIRoute.Guitars}/${id}`);

  if (error !== null && error.response?.status === NOT_FOUND_STATUS_CODE) {
    return <Redirect to={AppRoute.NotFound}/>;
  }

  return (
    <MainLayout>
      {isLoading ? <h1>Загрузка...</h1>
        :
        data !== null && (
          <main className="page-content">
            <div className="container">
              <h1 className="page-content__title title title--bigger">Товар</h1>
              <Breadcrumbs />
              <ProductDetail data={data}/>
              <Reviews />
            </div>
          </main>
        )}
    </MainLayout>
  );
}

export default Product;
