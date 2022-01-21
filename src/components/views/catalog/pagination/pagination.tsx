import PageLink from './page-link/page-link';
import { AppRoute, PAGE_SLICE_LENGTH } from '../../../../const';
import { getPageNumbers } from '../../../../store/reducers/catalog-slice/selectors';
import { Link, useLocation, useParams } from 'react-router-dom';
import { parsePageNumberFromString } from '../../../../utils/common';
import { useSelector } from 'react-redux';

type TParams = {
  page?: string;
}

function Pagination(): JSX.Element {
  const pageNumbers = useSelector(getPageNumbers);

  const { search } = useLocation();
  const { page }: TParams = useParams();

  const pageNumberParam = parsePageNumberFromString(page);

  const firstIndexSlice = (Math.ceil(pageNumberParam / PAGE_SLICE_LENGTH) - 1) * PAGE_SLICE_LENGTH;
  const secondIndexSlice = firstIndexSlice + PAGE_SLICE_LENGTH;

  const pageSlice = pageNumbers.slice(firstIndexSlice, secondIndexSlice);

  const isShowPrevBtn = pageNumberParam > 1;
  const isShowNextBtn = pageNumberParam < pageNumbers.length;

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
              to={`${AppRoute.CatalogPage}${pageNumberParam - 1}${search}`}
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
              to={`${AppRoute.CatalogPage}${pageNumberParam + 1}${search}`}
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
