import Footer from '../footer/footer';
import Header from '../header/header';
import SvgBasket from '../svg-basket/svg-basket';
import { ReactNode } from 'react';

type TProps = {
  children: ReactNode;
}

function MainLayout({ children }: TProps): JSX.Element {
  return (
    <>
      <div className="visually-hidden">
        <SvgBasket />
      </div>
      <div
        data-testid="main-layout"
        className="wrapper"
      >
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}

export default MainLayout;
