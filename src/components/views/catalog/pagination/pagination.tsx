import PageLink from './page-link/page-link';
import useQuery from '../../../../hooks/use-query';
import { AppRoute, CATALOG_PAGE_SIZE, QueryField } from '../../../../const';
import { getPageNumbers } from '../../../../store/reducers/catalog-slice/selectors';
import { Link, useHistory, useParams } from 'react-router-dom';
import { parsePageNumberFromString } from '../../../../utils/common';
import { setCurrentPage } from '../../../../store/reducers/catalog-slice/catalog-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const PAGINATION_STEP = 3;

type TParams = {
  page?: string;
}

function Pagination(): JSX.Element {
  const { page }: TParams = useParams();
  const query = useQuery();
  const history = useHistory();
  const pageNumbers = useSelector(getPageNumbers);

  const pageNumber = parsePageNumberFromString(page);

  const [pageSlice, setPageSlice] = useState<number[] | []>([]);

  const isShowPrevBtn = pageSlice[0] > pageNumbers[0];
  const isShowNextBtn = pageSlice[pageSlice.length - 1] < pageNumbers[pageNumbers.length -1];

  const dispatch = useDispatch();

  useEffect(() => {
    query.set(QueryField.Start, String(CATALOG_PAGE_SIZE * pageNumber - CATALOG_PAGE_SIZE));
    query.set(QueryField.End, String(CATALOG_PAGE_SIZE * pageNumber));

    dispatch(setCurrentPage(pageNumber));

    const firstIndexSlice = (Math.ceil(pageNumber / PAGINATION_STEP) - 1) * PAGINATION_STEP;
    const secondIndexSlice = firstIndexSlice + PAGINATION_STEP;

    setPageSlice(pageNumbers.slice(firstIndexSlice, secondIndexSlice));

    history.push(`${AppRoute.CatalogPage}${pageNumber}?${query}`);
  }, [dispatch, history, page, pageNumber, pageNumbers, query]);

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {isShowPrevBtn && (
          <li className="pagination__page pagination__page--prev" id="prev">
            <Link
              className="link pagination__page-link"
              to={`${AppRoute.CatalogPage}${pageSlice[0] - 1}?${query}`}
            >
              Назад
            </Link>
          </li>
        )}
        {pageSlice.length !== 0 && pageSlice.map((value) => (
          <PageLink
            key={value}
            pageNumber={value}
            isActive={value === pageNumber}
          />
        ))}
        {isShowNextBtn && (
          <li className="pagination__page pagination__page--next" id="next">
            <Link
              className="link pagination__page-link"
              to={`${AppRoute.CatalogPage}${pageSlice[pageSlice.length - 1] + 1}?${query}`}
            >
              Далее
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Pagination;
