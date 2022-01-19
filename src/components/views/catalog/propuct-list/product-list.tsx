import Empty from '../empty/empty';
import Loader from '../../../common/loader/loader';
import ProductCard from '../product-card/product-card';
import { AppRoute, CATALOG_PAGE_SIZE, QueryField } from '../../../../const';
import { fetchGuitarsByQuery } from '../../../../store/api-action';
import { FetchState } from '../../../../types/store';
import { getFetchState, getGuitarsCards, getIsDataLoaded } from '../../../../store/reducers/catalog-slice/selectors';
import { parse, stringify } from 'query-string';
import { parsePageNumberFromString } from '../../../../utils/common';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

type TParams = {
  page?: string;
}

function ProductList(): JSX.Element {
  const { search } = useLocation();
  const history = useHistory();
  const isDataLoaded = useSelector(getIsDataLoaded);
  const fetchState = useSelector(getFetchState);
  const guitarCards = useSelector(getGuitarsCards);

  const { page }: TParams = useParams();
  const pageNumber = parsePageNumberFromString(page);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isDataLoaded) {
      history.push(`${AppRoute.CatalogInitialPage}${search}`);
    }
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [search]);

  useEffect(() => {
    const startQuerySlice = CATALOG_PAGE_SIZE * pageNumber - CATALOG_PAGE_SIZE;
    const endQuerySlice = CATALOG_PAGE_SIZE * pageNumber;

    const searchWithQuerySlice = stringify({
      ...parse(search),
      [QueryField.Start]: startQuerySlice,
      [QueryField.End]: endQuerySlice,
    });

    dispatch(fetchGuitarsByQuery(searchWithQuerySlice));
  },
  [dispatch, pageNumber, search]);

  if (fetchState === FetchState.Pending) {
    return <Loader />;
  }

  if (guitarCards.length === 0) {
    return <Empty />;
  }

  return (
    <div
      data-testid="product-list"
      className="cards catalog__cards"
    >
      {guitarCards.map((card) => <ProductCard key={card.id} card={card}/>)}
    </div>
  );
}

export default ProductList;
