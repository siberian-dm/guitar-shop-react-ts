import classNames from 'classnames';
import { AppRoute } from '../../../../../const';
import { Link, useLocation } from 'react-router-dom';

type TProps = {
  pageNumber: number;
  isActive: boolean;
}

function PageLink({ pageNumber, isActive }: TProps): JSX.Element {
  const { search } = useLocation();

  const linkClass = classNames(
    'pagination__page',
    {'pagination__page--active': isActive},
  );

  return (
    <li key={pageNumber} className={linkClass}>
      <Link
        className="link pagination__page-link"
        to={`${AppRoute.CatalogPage}${pageNumber}${search}`}
      >
        {pageNumber}
      </Link>
    </li>
  );
}

export default PageLink;
