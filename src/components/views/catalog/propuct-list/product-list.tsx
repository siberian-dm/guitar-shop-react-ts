import ProductCard from '../product-card/product-card';
import { getGuitarsCards } from '../../../../store/reducers/app-data-reducer/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchGuitarsCardsAction } from '../../../../store/api-action';
import useQuery from '../../../../hooks/use-query';

const PAGE_SIZE = 9;

function ProductList(): JSX.Element {
  const query = useQuery();
  const sortType = query.get('sort');
  const sortOrder = query.get('order');

  const guitarCards = useSelector(getGuitarsCards).slice(0, PAGE_SIZE);

  const dispatch = useDispatch();

  useEffect(() => {
    if (sortType && sortOrder) {
      dispatch(fetchGuitarsCardsAction({sortType, sortOrder}));
    }
    if (sortType === null && sortOrder === null) {
      dispatch(fetchGuitarsCardsAction({}));
    }
  }, [sortType, sortOrder, dispatch]);

  return (
    <div className="cards catalog__cards">
      {guitarCards.length !==0 && (
        guitarCards.map((card) => <ProductCard key={card.id} card={card}/>)
      )}
    </div>
  );
}

export default ProductList;
