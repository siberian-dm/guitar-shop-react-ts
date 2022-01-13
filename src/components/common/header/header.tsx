import Logo, { LogoType } from '../logo/logo';
import SearchForm from './search-form/search-form';
import { AppRoute } from '../../../const';
import { Link } from 'react-router-dom';

function Header(): JSX.Element {
  return (
    <header className="header" id="header" data-testid="header">
      <div className="container header__wrapper">
        <Logo type={LogoType.Header}/>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li>
              <Link
                className="link main-nav__link link--current"
                to={AppRoute.CatalogInitialPage}
              >
                Каталог
              </Link>
            </li>
            <li>
              <Link
                className="link main-nav__link"
                to={''}
                onClick={(evt) => {
                  evt.preventDefault();
                }}
              >
                Где купить?
              </Link>
            </li>
            <li>
              <Link
                className="link main-nav__link"
                to={''}
                onClick={(evt) => {
                  evt.preventDefault();
                }}
              >
                О компании
              </Link>
            </li>
          </ul>
        </nav>
        <SearchForm />
        <Link
          className="header__cart-link"
          to={''}
          aria-label="Корзина"
          onClick={(evt) => {
            evt.preventDefault();
          }}
        >
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>
          <span className="header__cart-count">2</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
