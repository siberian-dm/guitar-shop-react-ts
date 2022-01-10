import Empty from '../empty/empty';
import Loader from '../../../common/loader/loader';
import ProductCard from '../product-card/product-card';
import { fetchGuitarsByQuery } from '../../../../store/api-action';
import { FetchState } from '../../../../types/store';
import { getFetchState, getGuitarsCards } from '../../../../store/reducers/catalog-slice/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ProductList(): JSX.Element {
  const { search } = useLocation();
  const fetchState = useSelector(getFetchState);
  const guitarCards = useSelector(getGuitarsCards);

  const dispatch = useDispatch();

  useEffect(() => {
    if (search) {
      dispatch(fetchGuitarsByQuery(search.slice(1)));
    }
  },
  [dispatch, search]);

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
