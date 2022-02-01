import axios, { AxiosError } from 'axios';
import Breadcrumbs from '../../common/breadcrumbs/breadcrumbs';
import Loader from '../../common/loader/loader';
import MainLayout from '../../common/main-layout/main-layout';
import ProductDetail from './product-detail/product-detail';
import Reviews from './reviews/reviews';
import { APIRoute, createAPI } from '../../../services/api';
import { AppRoute } from '../../../const';
import { Redirect, useParams } from 'react-router-dom';
import { TGuitarCard } from '../../../types/app-data';
import { useEffect, useState } from 'react';

const NOT_FOUND_STATUS_CODE = 404;

const api = createAPI();

type TParams = {
  id?: string;
}

function Product(): JSX.Element {
  const [data, setData] = useState<TGuitarCard | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams<TParams>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await api.get(`${APIRoute.Guitars}/${id}`);
        setData(response.data);
      }
      catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err);
        }
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      setData(null);
      setError(null);
      setIsLoading(false);
    };
  }, [id]);


  if (error !== null && error.response?.status === NOT_FOUND_STATUS_CODE) {
    return <Redirect to={AppRoute.NotFound}/>;
  }

  return (
    <MainLayout>
      <main className="page-content">
        <div className="container">
          {isLoading ? <Loader />
            :
            data !== null && (
              <>
                <h1 className="page-content__title title title--bigger">{data.name}</h1>
                <Breadcrumbs lastItemName={data.name}/>
                <ProductDetail data={data}/>
                <Reviews />
              </>
            )}
        </div>
      </main>
    </MainLayout>
  );
}

export default Product;
