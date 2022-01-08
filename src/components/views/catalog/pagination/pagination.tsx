import PageLink from './page-link/page-link';
import { AppRoute, CATALOG_PAGE_SIZE, QueryField } from '../../../../const';
import { getPageNumbers } from '../../../../store/reducers/catalog-slice/selectors';
import { Link, useLocation, useParams } from 'react-router-dom';
import { NumberParam, useQueryParams } from 'use-query-params';
import { parsePageNumberFromString } from '../../../../utils/common';
import { setCurrentPage } from '../../../../store/reducers/catalog-slice/catalog-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const SLICE_LENGTH = 3;

type TParams = {
  page?: string;
}

function Pagination(): JSX.Element {
  const [, setQueryParams] = useQueryParams({
    [QueryField.Start]: NumberParam,
    [QueryField.End]: NumberParam,
  });

  const [pageSlice, setPageSlice] = useState<number[] | []>([]);

  const { search } = useLocation();

  const { page }: TParams = useParams();
  const pageNumber = parsePageNumberFromString(page);

  const pageNumbers = useSelector(getPageNumbers);

  const isShowPrevBtn = pageSlice[0] > pageNumbers[0];
  const isShowNextBtn = pageSlice[pageSlice.length - 1] < pageNumbers[pageNumbers.length -1];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(pageNumber));
  },
  [dispatch, pageNumber]);

  useEffect(() => {
    const firstIndexSlice = (Math.ceil(pageNumber / SLICE_LENGTH) - 1) * SLICE_LENGTH;
    const secondIndexSlice = firstIndexSlice + SLICE_LENGTH;

    setPageSlice(pageNumbers.slice(firstIndexSlice, secondIndexSlice));
  },
  [pageNumber, pageNumbers]);

  useEffect(() => {
    const startPage = CATALOG_PAGE_SIZE * pageNumber - CATALOG_PAGE_SIZE;
    const endPage = CATALOG_PAGE_SIZE * pageNumber;

    setQueryParams({
      [QueryField.Start]: startPage,
      [QueryField.End]: endPage,
    });
  },
  [pageNumber, setQueryParams]);

  return (
    <div className="pagination page-content__pagination">
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
            isActive={value === pageNumber}
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
