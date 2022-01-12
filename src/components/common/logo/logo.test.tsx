import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { AppRoute } from '../../../const';
import Logo, { LogoType } from './logo';

describe('Component: Loader', () => {
  const history = createMemoryHistory();

  it('should render correctly', () => {
    render(
      <Router history={history}>
        <Logo />
      </Router>,
    );

    expect(screen.getByRole('link')).toHaveClass('header__logo');
    expect(screen.getByAltText('Логотип')).toBeInTheDocument();
  });

  it('link should is disable when user is on catalog page', () => {
    history.push(AppRoute.CatalogPage);
    render(
      <Router history={history}>
        <Logo />
      </Router>,
    );

    expect(screen.getByRole('link')).toHaveClass('not-active');
  });

  it('link should is active when user is not on catalog page', () => {
    history.push(AppRoute.Product);
    render(
      <Router history={history}>
        <Logo />
      </Router>,
    );

    expect(screen.getByRole('link')).not.toHaveClass('not-active');
  });

  it('should render correctly with "type={LogoType.Footer}" props', () => {
    render(
      <Router history={history}>
        <Logo type={LogoType.Footer}/>
      </Router>,
    );

    expect(screen.getByRole('link')).toHaveClass('footer__logo');
  });
});
