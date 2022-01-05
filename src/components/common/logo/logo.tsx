import classNames from 'classnames';
import styles from './logo.module.css';
import { AppRoute } from '../../../const';
import { Link, useLocation } from 'react-router-dom';

export enum LogoType {
  Header,
  Footer,
}

type TProps = {
  type: LogoType;
}

function Logo({ type }: TProps): JSX.Element {
  const { pathname } = useLocation();

  const isNotActiveLink = pathname.includes(AppRoute.CatalogPage);

  const logoClass = classNames(
    'logo',
    {
      'header__logo': type === LogoType.Header,
      'footer__logo': type === LogoType.Footer,
      [styles['not-active']]: isNotActiveLink,
    },
  );

  return (
    <Link
      className={logoClass}
      to={AppRoute.Root}
    >
      <img
        className="logo__img"
        width="70"
        height="70"
        src="/img/svg/logo.svg"
        alt="Логотип"
      />
    </Link>
  );
}

export default Logo;
