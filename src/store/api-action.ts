import { APIRoute } from '../services/api';
import { FetchState } from '../types/store';
import {
  loadCardTotalCount,
  loadGuitarsCards,
  loadPriceMaxLimit,
  loadPriceMinLimit,
  setFetchState
} from './reducers/catalog-slice/catalog-slice';
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

      dispatch(loadCardTotalCount(cardTotalCount));
      dispatch(loadPriceMinLimit(guitarWithMinPrice[0].price));
      dispatch(loadPriceMaxLimit(guitarWithMaxPrice[0].price));
      dispatch(loadGuitarsCards(guitarsByQuery));
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
