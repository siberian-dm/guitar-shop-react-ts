import Empty from '../empty/empty';
import Loader from '../../../common/loader/loader';
import ProductCard from '../product-card/product-card';
import useQuery from '../../../../hooks/use-query';
import { AppRoute } from '../../../../const';
import { fetchGuitarsByQuery } from '../../../../store/api-action';
import { FetchState } from '../../../../types/store';
import { getFetchState, getGuitarsCards } from '../../../../store/reducers/catalog-slice/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { validateQueryParams } from '../../../../utils/validate-query-params';

function ProductList(): JSX.Element {
  const query = useQuery();
  const history = useHistory();
  const dispatch = useDispatch();
  const fetchState = useSelector(getFetchState);
  const guitarCards = useSelector(getGuitarsCards);

  useEffect(() => {
    const { queryString, isChanged } = validateQueryParams(query);

    if (isChanged) {
      history.push(`${AppRoute.Catalog}?${queryString}`);
    }

    dispatch(fetchGuitarsByQuery(queryString));
  }, [dispatch, history, query]);

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
