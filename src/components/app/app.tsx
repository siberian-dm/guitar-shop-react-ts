import Main from '../views/main/main';
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
          <Main />
        </Route>
        <Route path={AppRoute.ProductPage} exact>
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
