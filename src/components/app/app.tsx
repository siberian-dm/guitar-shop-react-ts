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
import { QueryParamProvider } from 'use-query-params';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={Route}>
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
      </QueryParamProvider>
    </BrowserRouter>
  );
}

export default App;
