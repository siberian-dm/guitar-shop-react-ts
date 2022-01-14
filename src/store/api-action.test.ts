import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { APIRoute, createAPI } from '../services/api';
import { CATALOG_PAGE_SIZE } from '../const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fetchGuitarsByName, fetchGuitarsByQuery } from './api-action';
import { FetchState, TRootState } from '../types/store';
import { getMockGuitarCardsWithComments, mockSearchedGuitars } from '../mocks/app-mock-data';
import {
  setCardTotalCount,
  setFetchState,
  setGuitarsCards,
  setPriceMaxLimit,
  setPriceMinLimit
} from './reducers/catalog-slice/catalog-slice';
import { setSearchedGuitars } from './reducers/search-form-slice/search-form-slice';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      TRootState,
      Action,
      ThunkDispatch<TRootState, typeof api, Action>
    >(middlewares);

  it('should update store when dispatch fetchGuitarsByName api-action', async () => {
    const store = mockStore();
    const name = 'name';
    mockAPI
      .onGet(`${APIRoute.GuitarsSearch}${name}`)
      .reply(200, mockSearchedGuitars);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchGuitarsByName(name));

    expect(store.getActions()).toEqual([
      setSearchedGuitars(mockSearchedGuitars),
    ]);
  });

  it('should update store when dispatch fetchGuitarsByQuery api-action', async () => {
    const xTotalCount = 27;
    const guitars = getMockGuitarCardsWithComments(CATALOG_PAGE_SIZE);
    const minPrice = 1500;
    const maxPrice = 35000;
    const store = mockStore();
    const queryString = '';

    mockAPI
      .onGet(APIRoute.GuitarsWithComments)
      .reply(200, guitars, {'x-total-count': xTotalCount});
    mockAPI
      .onGet(APIRoute.GuitarWithMinPrice)
      .reply(200, [{price: minPrice}]);
    mockAPI
      .onGet(APIRoute.GuitarWithMaxPrice)
      .reply(200, [{price: maxPrice}]);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchGuitarsByQuery(queryString));

    expect(store.getActions()).toEqual([
      setFetchState(FetchState.Pending),
      setCardTotalCount(xTotalCount),
      setPriceMinLimit(minPrice),
      setPriceMaxLimit(maxPrice),
      setGuitarsCards(guitars),
      setFetchState(FetchState.Idle),
    ]);
  });
});
