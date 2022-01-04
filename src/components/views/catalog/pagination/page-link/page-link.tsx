import classNames from 'classnames';
import useQuery from '../../../../../hooks/use-query';
import { AppRoute } from '../../../../../const';
import { Link } from 'react-router-dom';

type TProps = {
  pageNumber: number;
  isActive: boolean;
}

function PageLink({ pageNumber, isActive }: TProps): JSX.Element {
  const query = useQuery();

  const linkClass = classNames(
    'pagination__page',
    {'pagination__page--active': isActive},
  );

  return (
    <li key={pageNumber} className={linkClass}>
      <Link
        className="link pagination__page-link"
        to={`${AppRoute.CatalogPage}${pageNumber}?${query}`}
      >
        {pageNumber}
      </Link>
    </li>
  );
}

export default PageLink;
