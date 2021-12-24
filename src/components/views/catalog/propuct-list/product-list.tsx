import Loader from '../../../common/loader/loader';
import ProductCard from '../product-card/product-card';
import useQuery from '../../../../hooks/use-query';
import { AppRoute } from '../../../../const';
import { fetchGuitarsCardsAction } from '../../../../store/api-action';
import { FetchState } from '../../../../types/store';
import { getFetchState, getGuitarsCards } from '../../../../store/reducers/app-data-reducer/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { validateQueryParams } from '../../../../utils/validate-query-params';

const PAGE_SIZE = 9;

function ProductList(): JSX.Element {
  const query = useQuery();
  const history = useHistory();

  const fetchState = useSelector(getFetchState);
  const guitarCards = useSelector(getGuitarsCards).slice(0, PAGE_SIZE);

  const dispatch = useDispatch();

  useEffect(() => {
    const {queryString, isStringify} = validateQueryParams(query);

    if (isStringify) {
      history.push(`${AppRoute.Catalog}?${queryString}`);
    }

    dispatch(fetchGuitarsCardsAction(queryString));

  }, [dispatch, history, query]);

  if (fetchState === FetchState.Pending) {
    return <Loader />;
  }

  return (
    <div className="cards catalog__cards">
      {guitarCards.length !==0 && (
        guitarCards.map((card) => <ProductCard key={card.id} card={card}/>)
      )}
    </div>
  );
}

export default ProductList;
