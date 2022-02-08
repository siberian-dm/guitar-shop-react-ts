import Breadcrumbs from '../../common/breadcrumbs/breadcrumbs';
import Loader from '../../common/loader/loader';
import MainLayout from '../../common/main-layout/main-layout';
import ProductDetail from './product-detail/product-detail';
import ReviewList from './review-list/review-list';
import API, { APIRoute } from '../../../services/api';
import { AppRoute } from '../../../const';
import { Redirect, useParams } from 'react-router-dom';
import { TGuitarCard } from '../../../types/app-data';
import { useEffect, useState } from 'react';
import { useFetch } from '../../../hooks/use-fetch';

const NOT_FOUND_STATUS_CODE = 404;

type TParams = {
  id?: string;
}

function Product(): JSX.Element {
  const [guitar, setGuitar] = useState<TGuitarCard | null>(null);
  const { id: guitarId  } = useParams<TParams>();

  const [fetchGuitar, isLoading, error] = useFetch(
    async (id: string) => {
      const { data } = await API.get(`${APIRoute.Guitars}/${id}?_embed=comments`);

      setGuitar(data);
    });

  useEffect(() => {
    fetchGuitar(guitarId);
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [guitarId]);

  if (error !== null && error.response?.status === NOT_FOUND_STATUS_CODE) {
    return <Redirect to={AppRoute.NotFound}/>;
  }

  return (
    <MainLayout>
      <main className="page-content">
        <div className="container">
          {isLoading ? <Loader />
            :
            guitar !== null && (
              <>
                <h1 className="page-content__title title title--bigger">
                  {guitar.name}
                </h1>
                <Breadcrumbs lastItemName={guitar.name}/>
                <ProductDetail data={guitar}/>
                {guitarId  && (
                  <ReviewList
                    guitarName={guitar.name}
                    guitarId={guitarId}
                    fetchGuitar={fetchGuitar}
                  />
                )}
              </>
            )}
        </div>
      </main>
    </MainLayout>
  );
}

export default Product;
