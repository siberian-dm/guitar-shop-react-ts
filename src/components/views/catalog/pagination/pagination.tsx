import PageLink from './page-link/page-link';
import {
  AppRoute,
  CATALOG_PAGE_SIZE,
  PAGE_SLICE_LENGTH,
  QueryField
} from '../../../../const';
import { getPageNumbers } from '../../../../store/reducers/catalog-slice/selectors';
import {
  Link,
  useHistory,
  useLocation,
  useParams
} from 'react-router-dom';
import { NumberParam, useQueryParams } from 'use-query-params';
import { parsePageNumberFromString } from '../../../../utils/common';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

type TParams = {
  page?: string;
}

function Pagination(): JSX.Element {
  const [, setQueryParams] = useQueryParams({
    [QueryField.Start]: NumberParam,
    [QueryField.End]: NumberParam,
  });
  const pageNumbers = useSelector(getPageNumbers);

  const { page }: TParams = useParams();
  const pageNumberParam = parsePageNumberFromString(page);

  const isPageNumberParamValid = pageNumberParam <= pageNumbers.length;

  const validPageNumber = isPageNumberParamValid
    ? pageNumberParam
    : pageNumbers[pageNumbers.length - 1] ?? 1;

  const firstIndexSlice = (Math.ceil(validPageNumber / PAGE_SLICE_LENGTH) - 1) * PAGE_SLICE_LENGTH;
  const secondIndexSlice = firstIndexSlice + PAGE_SLICE_LENGTH;

  const pageSlice = pageNumbers.slice(firstIndexSlice, secondIndexSlice);


  const { search } = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (!isPageNumberParamValid) {
      history.push(`${AppRoute.CatalogPage}${validPageNumber}${search}`);
    }
  },
  [history, isPageNumberParamValid, search, validPageNumber]);

  useEffect(() => {
    const startPage = CATALOG_PAGE_SIZE * validPageNumber - CATALOG_PAGE_SIZE;
    const endPage = CATALOG_PAGE_SIZE * validPageNumber;

    setQueryParams({
      [QueryField.Start]: startPage,
      [QueryField.End]: endPage,
    });
  },
  [setQueryParams, validPageNumber]);

  const isShowPrevBtn = pageSlice[0] > pageNumbers[0];
  const isShowNextBtn = pageSlice[pageSlice.length - 1] < pageNumbers[pageNumbers.length -1];

  return (
    <div
      data-testid="pagination"
      className="pagination page-content__pagination"
    >
      <ul className="pagination__list">
        {isShowPrevBtn && (
          <li className="pagination__page pagination__page--prev" id="prev">
            <Link
              className="link pagination__page-link"
              to={`${AppRoute.CatalogPage}${pageSlice[0] - 1}${search}`}
            >
              Назад
            </Link>
          </li>
        )}
        {pageSlice.length !== 0 && pageSlice.map((value) => (
          <PageLink
            key={value}
            pageNumber={value}
            isActive={value === pageNumberParam}
          />
        ))}
        {isShowNextBtn && (
          <li className="pagination__page pagination__page--next" id="next">
            <Link
              className="link pagination__page-link"
              to={`${AppRoute.CatalogPage}${pageSlice[pageSlice.length - 1] + 1}${search}`}
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
