import Empty from '../empty/empty';
import Loader from '../../../common/loader/loader';
import ProductCard from '../product-card/product-card';
import useFetch from '../../../../hooks/use-fetch';
import useQuery from '../../../../hooks/use-query';
import { APIRoute } from '../../../../services/api';
import { AppRoute } from '../../../../const';
import { fetchGuitarsCardsAction } from '../../../../store/api-action';
import { TGuitarCards } from '../../../../types/app-data';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { validateQueryParams } from '../../../../utils/validate-query-params';

function ProductList(): JSX.Element {
  const query = useQuery();
  const history = useHistory();
  const dispatch = useDispatch();

  const { queryString, isChanged } = validateQueryParams(query);

  if (isChanged) {
    history.push(`${AppRoute.Catalog}?${queryString}`);
  }

  const { data: guitarCards, isLoading } = useFetch<TGuitarCards>(
    `${APIRoute.GuitarsWithComments}${queryString && `&${queryString}`}`,
  );

  const isDataLoaded = guitarCards !== null && guitarCards.length !==0;

  if (isLoading) {
    return <Loader />;
  }

  if (isDataLoaded) {
    dispatch(fetchGuitarsCardsAction());
  }
  else {
    return <Empty />;
  }

  return (
    <div className="cards catalog__cards">
      {isDataLoaded && (
        guitarCards.map((card) => <ProductCard key={card.id} card={card}/>)
      )}
    </div>
  );
}

export default ProductList;
