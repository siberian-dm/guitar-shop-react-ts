import Empty from '../empty/empty';
import Loader from '../../../common/loader/loader';
import ProductCard from '../product-card/product-card';
import useQuery from '../../../../hooks/use-query';
import { fetchGuitarsByQuery } from '../../../../store/api-action';
import { FetchState } from '../../../../types/store';
import { getCatalogRouteWithCurrentPage, getFetchState, getGuitarsCards } from '../../../../store/reducers/catalog-slice/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { validateQueryParams } from '../../../../utils/validate-query-params';

function ProductList(): JSX.Element {
  const query = useQuery();
  const history = useHistory();
  const fetchState = useSelector(getFetchState);
  const guitarCards = useSelector(getGuitarsCards);
  const catalogRouteWithCurrentPage = useSelector(getCatalogRouteWithCurrentPage);

  const dispatch = useDispatch();

  useEffect(() => {
    const { queryString, isChanged } = validateQueryParams(query);

    if (isChanged) {
      history.push(`${catalogRouteWithCurrentPage}?${queryString}`);
    }

    dispatch(fetchGuitarsByQuery(queryString));
  }, [catalogRouteWithCurrentPage, dispatch, history, query]);

  if (fetchState === FetchState.Pending) {
    return <Loader />;
  }

  if (guitarCards.length === 0) {
    return <Empty />;
  }


  return (
    <div className="cards catalog__cards">
      {guitarCards.map((card) => <ProductCard key={card.id} card={card}/>)}
    </div>
  );
}

export default ProductList;
