import Catalog from '../views/catalog/catalog';
import NotFound from '../views/not-found/not-found';
import Product from '../views/product/product';
import { AppRoute } from '../../const';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Root} exact>
          <Redirect to={AppRoute.CatalogInitialPage}/>
        </Route>
        <Route path={AppRoute.Catalog} exact>
          <Catalog />
        </Route>
        <Route path={AppRoute.ProductById} exact>
          <Product />
        </Route>
        <Route path={AppRoute.NotFound} exact>
          <NotFound />
        </Route>
        <Route>
          <Redirect to={AppRoute.NotFound}/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
