import { APIRoute } from '../services/api';
import { FetchState } from '../types/store';
import {
  setCardTotalCount,
  setGuitarsCards,
  setPriceMaxLimit,
  setPriceMinLimit,
  setFetchState
} from './reducers/catalog-slice/catalog-slice';
import { setSearchedGuitars } from './reducers/search-form-slice/search-form-slice';
import { parse, stringify } from 'query-string';
import { parseIntNumberFromString } from '../utils/common';
import { QueryField } from '../const';
import { ThunkActionResult } from '../types/action';
import { toast } from 'react-toastify';

export const fetchGuitarsByQuery = (queryString: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      dispatch(setFetchState(FetchState.Pending));

      const parsed = parse(queryString);
      const priceRangeQuery = stringify({
        ...parsed,
        [QueryField.Sort]: '',
        [QueryField.Order]: '',
        [QueryField.PriceMin]: '',
        [QueryField.PriceMax]: '',
        [QueryField.Start]: '',
        [QueryField.End]: '',
      }, {skipEmptyString: true});

      const [
        { data: guitarWithMinPrice },
        { data: guitarWithMaxPrice },
        { data: guitarsByQuery, headers },
      ] =
      await Promise.all([
        api.get(`${APIRoute.GuitarWithMinPrice}${priceRangeQuery && `&${priceRangeQuery}`}`),
        api.get(`${APIRoute.GuitarWithMaxPrice}${priceRangeQuery && `&${priceRangeQuery}`}`),
        api.get(`${APIRoute.GuitarsWithComments}${queryString && `&${queryString}`}`),
      ]);

      const cardTotalCount = parseIntNumberFromString(headers['x-total-count']);

      dispatch(setCardTotalCount(cardTotalCount));
      dispatch(setPriceMinLimit(guitarWithMinPrice[0].price));
      dispatch(setPriceMaxLimit(guitarWithMaxPrice[0].price));
      dispatch(setGuitarsCards(guitarsByQuery));
    }
    catch (error) {
      const errorMessage = (error as {message: string}).message;

      if (errorMessage) {
        toast.error(errorMessage);
      }
    }
    finally {
      dispatch(setFetchState(FetchState.Idle));
    }
  };

export const fetchGuitarsByName = (name: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get(`${APIRoute.GuitarsSearch}${name}`);

      dispatch(setSearchedGuitars(data));
    }
    catch (error) {
      const errorMessage = (error as {message: string}).message;

      if (errorMessage) {
        toast.error(errorMessage);
      }
    }
  };
