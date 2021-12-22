import ProductCard from '../product-card/product-card';
import { getGuitarsCards } from '../../../../store/reducers/app-data-reducer/selectors';
import { useSelector } from 'react-redux';

const PAGE_SIZE = 9;

function ProductList(): JSX.Element {
  const guitarCards = useSelector(getGuitarsCards).slice(0, PAGE_SIZE);

  return (
    <div className="cards catalog__cards">
      {guitarCards.length !==0 && (
        guitarCards.map((card) => <ProductCard key={card.id} card={card}/>)
      )}
    </div>
  );
}

export default ProductList;
