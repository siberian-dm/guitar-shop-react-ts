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
