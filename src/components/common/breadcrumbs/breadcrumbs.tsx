import { AppRoute } from '../../../const';
import { Link } from 'react-router-dom';

function Breadcrumbs(): JSX.Element {
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
    </ul>
  );
}

export default Breadcrumbs;
