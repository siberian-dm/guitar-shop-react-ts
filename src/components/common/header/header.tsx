import classNames from 'classnames';
import Logo, { LogoType } from '../logo/logo';
import Search from './search/search';
import { AppRoute } from '../../../const';
import { Link, useLocation } from 'react-router-dom';

function Header(): JSX.Element {
  const location = useLocation();

  const setNavItemClass = (path: string) => classNames(
    'link main-nav__link',
    {'link--current': location.pathname.includes(path)},
  );

  return (
    <header className="header" id="header" data-testid="header">
      <div className="container header__wrapper">
        <Logo type={LogoType.Header}/>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li>
              <Link
                className={setNavItemClass(AppRoute.CatalogPage)}
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
        <Search />
        <Link
          className="header__cart-link"
          to={AppRoute.Cart}
          aria-label="Корзина"
        >
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"/>
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>
          <span className="header__cart-count">2</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
