import MockAdapter from 'axios-mock-adapter';
import SearchedItemList, { TProps } from './searched-item-list';
import thunk from 'redux-thunk';
import { AppRoute, BtnKey } from '../../../../../const';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../../../../services/api';
import { createMemoryHistory } from 'history';
import { fireEvent, render, screen } from '@testing-library/react';
import { initialState } from '../../../../../store/reducers/search-slice/search-slice';
import { mockSearchedGuitars } from '../../../../../mocks/app-mock-data';
import { Provider } from 'react-redux';
import { ReducerName } from '../../../../../types/store';
import { Router } from 'react-router-dom';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(mockAPI)];

const mockStore = configureMockStore(middlewares);

const history = createMemoryHistory();

const fakeSearchForm = (
  store: MockStore,
  props: TProps,
) => (
  <Provider store={store}>
    <Router history={history}>
      <SearchedItemList {...props}/>
    </Router>
  </Provider>
);

describe('Component: SearchedItemList', () => {
  const store = mockStore({
    [ReducerName.Search]: {...initialState},
  });

  const storeWithItems = mockStore({
    [ReducerName.Search]: {
      ...initialState,
      searchedGuitars: mockSearchedGuitars,
    },
  });

  const props = {
    setUListElement: jest.fn(),
    isInputFocused: false,
    isItemListShow: false,
  };

  it('should render correctly', () => {
    render(fakeSearchForm(storeWithItems, {
      ...props,
      isItemListShow: true,
    }));

    expect(screen.getByRole('list')).toHaveClass('list-opened');

    for (const mockGuitar of mockSearchedGuitars) {
      expect(screen.getByText(mockGuitar.name)).toBeInTheDocument();
    }
  });

  it('should render without item list', () => {
    render(fakeSearchForm(store, props));

    expect(screen.getByRole('list')).toHaveClass('hidden');
  });

  it('should call setUListElement after render', () => {
    render(fakeSearchForm(store, props));

    expect(props.setUListElement).toHaveBeenCalled();
  });

  it('should set focus on list items by arrow keys', async () => {
    render(fakeSearchForm(storeWithItems, {
      ...props,
      isItemListShow: true,
    }));

    const listItems = screen.getAllByRole('listitem');

    for (let i = 0; i < listItems.length - 1; i++) {
      fireEvent.keyDown(listItems[i], {key: BtnKey.ArrowDown});
      expect(listItems[i + 1]).toHaveFocus();
    }

    for (let i = listItems.length - 1; i > 0; i--) {
      fireEvent.keyDown(listItems[i], {key: BtnKey.ArrowUp});
      expect(listItems[i - 1]).toHaveFocus();
    }
  });

  it('should push history by pressing the "Enter" key in the list item', () => {
    render(fakeSearchForm(storeWithItems, {
      ...props,
      isItemListShow: true,
    }));

    const listItems = screen.getAllByRole('listitem');

    listItems[0].focus();
    fireEvent.keyDown(listItems[0], {key: BtnKey.Enter});

    expect(history.location.pathname).toEqual(`${AppRoute.Product}/${mockSearchedGuitars[0].id}`);
  });
});
