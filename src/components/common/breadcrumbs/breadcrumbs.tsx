import { AppRoute } from '../../../const';
import { Link } from 'react-router-dom';

type TProps = {
  lastItemName?: string;
}

function Breadcrumbs({ lastItemName }: TProps): JSX.Element {
  return (
    <ul
      data-testid="breadcrumbs"
      className="breadcrumbs page-content__breadcrumbs"
    >
      <li className="breadcrumbs__item">
        <Link
          className="link"
          to={AppRoute.Root}
          onClick={(evt) => evt.preventDefault()}
        >
          Главная
        </Link>
      </li>
      <li className="breadcrumbs__item">
        <Link className="link" to={AppRoute.CatalogInitialPage}>
          Каталог
        </Link>
      </li>
      {lastItemName && (
        <li className="breadcrumbs__item">
          <Link className="link" to={''}>
            {lastItemName}
          </Link>
        </li>
      )}
    </ul>
  );
}

export default Breadcrumbs;
