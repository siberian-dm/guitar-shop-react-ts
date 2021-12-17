import Main from '../views/main/main';
import NotFound from '../views/not-found/not-found';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <Main />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
